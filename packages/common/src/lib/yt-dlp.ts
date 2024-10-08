import { tmpdir } from "node:os";

interface Options {
  paths?: string;
  url: string;
  withMusic?: string;
}

export async function ytDlp({ paths, url, withMusic }: Options) {
  const proc = Bun.spawn([
    "yt-dlp",
    "--paths",
    paths ?? tmpdir(),
    "--output",
    `${globalThis.crypto.randomUUID()}.%(ext)s`,
    "--format",
    "mp4",
    ...(withMusic ? ["-x"] : []),
    url,
  ]);

  await proc.exited;

  const output = await new Response(proc.stdout).text();

  const downloadLine = output.split("[download]").map((line) => line.trim())[1];
  const location = downloadLine.split("Destination: ")[1];

  return location;
}
