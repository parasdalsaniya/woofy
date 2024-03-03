import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import io from "./socket-server";
dotenv.config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 4000;

io.attach(
  app.listen(PORT, () => {
    console.log(`Server listening on *:${PORT}`);
  })
);
