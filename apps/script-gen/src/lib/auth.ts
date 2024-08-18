const stringToBase64 = (str: string) => {
  const bytes = new TextEncoder().encode(str);
  const binaryString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte)
  ).join("");

  return btoa(binaryString);
};

export const basicAuth = (username: string, password: string) => {
  return stringToBase64(`${username}:${password}`);
};
