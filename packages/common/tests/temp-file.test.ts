import { describe, expect, it } from "bun:test";
import { TempFileManager } from "../src";

describe("TempFileManager", () => {
  const dir = "test-temp-files";
  const manager = new TempFileManager({ dir });

  it("should create a temp file and write data to it", async () => {
    const filename = "test_file";
    const data = "Hello, world!";

    const filePath = await manager.create(filename, data);

    const fileData = await Bun.file(filePath).text();
    expect(fileData).toBe(data);

    await manager.delete(filename);
  });

  it("should delete the created temp file", async () => {
    const filename = "test_file";
    const data = "Hello, world!";

    const filePath = await manager.create(filename, data);

    await manager.delete(filename);

    const fileExists = await Bun.file(filePath).exists();

    expect(fileExists).toBe(false);
  });

  it("should delete all temp files", async () => {
    const fileNames = Array(10)
      .fill(undefined)
      .map((_, i) => `test_file_${i}`);
    const data = "Hello, world!";

    const createPromises = fileNames.map((filename) =>
      manager.create(filename, data),
    );

    const results = await Promise.all(createPromises);

    await manager.deleteAll();

    const filesExistences = await Promise.all(
      results.map((filePath) => Bun.file(filePath).exists()),
    );

    expect(filesExistences.every((exists) => !exists)).toBe(true);
  });
});
