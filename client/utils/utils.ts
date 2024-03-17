export const getLocalData = <T>(key: string): T | null => {
  const localRef = localStorage.getItem(key);
  const data: T | null = localRef ? JSON.parse(localRef) : null;
  return data;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  } else if (typeof error === 'string') {
    return error;
  } else if (error === null || error === undefined) {
    return 'An error occurred';
  }
  return 'An unknown error occurred';
};
