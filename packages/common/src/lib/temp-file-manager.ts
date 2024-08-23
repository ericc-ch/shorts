import { rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "pathe";

type BunWriteInput =
  | Blob
  | NodeJS.TypedArray
  | ArrayBufferLike
  | string
  | Bun.BlobPart[];

interface TempFileOptions {
  dir?: string;
  prefix?: string;
  postfix?: string;
}

export class TempFileManager {
  private dir = tmpdir();
  private prefix: string;
  private postfix: string;

  constructor({ dir, postfix = "", prefix = "" }: TempFileOptions) {
    if (dir) this.dir = join(this.dir, dir);
    this.prefix = prefix;
    this.postfix = postfix;
  }

  private filePath = (name: string) =>
    join(this.dir, this.prefix + name + this.postfix);

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
