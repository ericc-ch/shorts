import { VIDEO_TYPE } from "api-schema/queue";
import consola from "consola";
import { renderQueue } from "./lib/queue";
import { renderCrackBotReaction } from "./lib/renders/crackbot.reaction";
import { clearAssets } from "./lib/files";

const functionMap = new Map([
  [VIDEO_TYPE.CRACKBOT_REACTION, renderCrackBotReaction],
] as const);

renderQueue.subscribe(async (data, ack) => {
  const func = functionMap.get(data.type);
  if (!func) throw new Error(`Unknown video type: ${data.type}`);

  await func(data);
  consola.success(`Rendered video: ${data.id}`);

  await clearAssets();
  consola.info(`Cleared assets (public) folder`);

  ack();
});

setTimeout(() => {
  renderQueue.publish({
    id: "4376af59-1044-4f9d-b1c4-f62af1a851f3",
    metadata: {
      title: "This Goldfish Is Better at Elden Ring Than You!",
      description:
        "Watch this goldfish absolutely dominate Malenia, the Blade of Miquella, in Elden Ring. You won't believe your eyes!",
      tags: ["Elden Ring", "Goldfish", "Gaming", "Funny", "Malenia"],
    },
    isRendered: false,
    isUploaded: false,
    renderOptions: { language: "en-US", voice: "en-US-EmmaNeural" },
    type: 0,
    payload: {
      script:
        "Wait, hold up. Did that goldfish just beat Malenia? I think I'm having a flashback. It's all coming back to me.  That… that's the same type of fish I used to have. I called him… I called him…  oh yeah! I called him…  Fuzzy…Fuzzy the… the goldfish. I tried to teach him… to play…  chess…  with a bunch of…  cotton candy… It was… uh…  I don't wanna talk about it. Back to the video.  This goldfish is…  I…  I need to get a goldfish. And name him Fuzzy. Maybe…  Maybe…  he'll be better at…  something.",
      backgroundVideoUrl: "https://www.youtube.com/shorts/8HW3o1dO4g8",
    },
  });
}, 1000);
