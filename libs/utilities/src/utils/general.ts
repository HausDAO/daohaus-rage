export const getNonce = (length = 24) => {
  let text = '';
  const possible = '0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const isBoolean = (item: unknown) => typeof item === 'boolean';
export const isString = (item: unknown) => typeof item === 'string';
export const isNumber = (item: unknown) => typeof item === 'number';
export const isArray = (item: unknown) => Array.isArray(item);
export const isObject = (item: unknown) =>
  item &&
  typeof item === 'object' &&
  !Array.isArray(item) &&
  typeof item !== 'function';

export const isErrorType = (item: unknown) =>
  item && typeof item === 'object' && 'error' in item && 'message' in item;
export const isArrayString = (string: string) => {
  try {
    return Array.isArray(JSON.parse(string));
  } catch (error) {
    return false;
  }
};
