import { rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "pathe";

type BunWriteInput =
  | ArrayBufferLike
  | Blob
  | Bun.BlobPart[]
  | NodeJS.TypedArray
  | string;

interface TempFileOptions {
  dir?: string;
  postfix?: string;
  prefix?: string;
}

export class TempFileManager {
  private dir = tmpdir();
  private postfix: string;
  private prefix: string;

  private filePath = (name: string) =>
    join(this.dir, this.prefix + name + this.postfix);

  constructor({ dir, postfix = "", prefix = "" }: TempFileOptions) {
    if (dir) this.dir = join(this.dir, dir);
    this.prefix = prefix;
    this.postfix = postfix;
  }

  public async create(filename: string, data: BunWriteInput) {
    const filePath = this.filePath(filename);
    await Bun.write(filePath, data);

    return filePath;
  }

  public async delete(filename: string) {
    const filePath = this.filePath(filename);
    await rm(filePath);
  }

  public async deleteAll() {
    if (this.dir === tmpdir())
      throw new Error("Can't delete all files when using default tmpdir");
    await rm(this.dir, { recursive: true });
  }
}
