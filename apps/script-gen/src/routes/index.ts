import type { Hono } from "hono";
import type { BlankEnv, BlankSchema } from "hono/types";
import { readdir } from "node:fs/promises";

const IGNORED_FILES = ["index.ts"];
const routesDir = import.meta.dir;

const dirContents = await readdir(routesDir);
const routePaths = dirContents.filter((path) => !IGNORED_FILES.includes(path));

const routeImports = await Promise.all(
  routePaths.map(async (path) => import(`./${path}`)),
);

export const routes: Array<Hono<BlankEnv, BlankSchema, "/">> = routeImports.map(
  (route) => route.default,
);
