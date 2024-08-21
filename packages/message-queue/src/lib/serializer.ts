export function serialize<T>(data: T): Buffer {
  return Buffer.from(JSON.stringify(data));
}

export function deserialize<T>(data: Buffer): T {
  return JSON.parse(data.toString());
}
