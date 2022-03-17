export const isArrayString = (string: string) => {
  try {
    return Array.isArray(JSON.parse(string));
  } catch (error) {
    return false;
  }
};
