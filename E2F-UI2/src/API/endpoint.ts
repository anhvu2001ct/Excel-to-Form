export const apiEndpoint = (...path: string[]) => {
  return `http://localhost:5121/api/v2/${path.join("/")}`;
};
