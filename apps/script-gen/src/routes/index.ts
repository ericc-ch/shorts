import type { Hono } from "hono";
import { readdir } from "node:fs/promises";

type RouteModule = {
  default: Hono;
};

const IGNORED_FILES = ["index.ts"];
const routesDir = import.meta.dir;

const dirContents = await readdir(routesDir);
const routePaths = dirContents.filter((path) => !IGNORED_FILES.includes(path));

const routeImports = await Promise.all(
  routePaths.map(async (path) => import(`./${path}`) as Promise<RouteModule>),
);

export const routes: Array<Hono> = routeImports.map((route) => route.default);
