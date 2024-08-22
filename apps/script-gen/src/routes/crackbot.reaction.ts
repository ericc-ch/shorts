import { uploadPath, waitForFileActive } from "@/lib/files";
import { crackBotReaction } from "@/services/crackbot.reaction";
import { zValidator } from "@hono/zod-validator";
import { requestSchema } from "api-schema/crackbot.reaction";
import { MIME_TYPES, ytDlp } from "common";
import consola from "consola";
import { Hono } from "hono";
import { rm } from "node:fs/promises";

const routes = new Hono();

routes.post(
  "/crackbot/reaction",
  zValidator("json", requestSchema),
  async (c) => {
    const validated = c.req.valid("json");

    consola.info(`Downloading video: ${validated.url}`);
    const videoPath = await ytDlp({ url: validated.url });

    consola.success(`Downloaded video: ${videoPath}`);

    const uploaded = await uploadPath(videoPath, MIME_TYPES.VIDEO.MP4);
    await waitForFileActive(uploaded.file);

    consola.info(`Deleting downloaded video: ${videoPath}`);
    await rm(videoPath);

    const response = await crackBotReaction({ file: uploaded.file });
    return c.json(response);
  }
);

export default routes;
