export const isArrayString = (string: string, returnArray = true) => {
  try {
    return Array.isArray(JSON.parse(string));
  } catch (error) {
    return false;
  }
};
