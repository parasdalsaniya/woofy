export const getLocalData = <T>(key: string): T | null => {
  const localRef = localStorage.getItem(key);
  const data: T | null = localRef ? JSON.parse(localRef) : null;
  return data;
};
