import type { Queue } from "api-schema/queue";
import configJson from "~/public/config.json";

// Needed for type casting
export const config = configJson as Queue;
