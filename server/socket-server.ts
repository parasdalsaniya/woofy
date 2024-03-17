import { Server, Socket } from "socket.io";
import http from "http";
import redis from "./redis-server";

const httpServer = http.createServer();

interface SocketWithUser extends Socket {
  user: string;
}

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }

  const user = await redis.get(`session:${token}`);
  if (!user) {
    return next(new Error("Authentication error"));
  }
  return next();
});

io.on("connect", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });

  socket.on("sendMessage", (data) => {
    io.emit(data.id, data.message);
  });
});

const SOCKET_PORT = process.env.SOCKET_PORT || 4001;

httpServer.listen(SOCKET_PORT, () => {
  console.log(`Socket server listening on *:${SOCKET_PORT}`);
});

export default io;
