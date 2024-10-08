import { Composition } from "remotion";

import { CrackBotReaction } from "./compositions/crackbot.reaction";
import { CrackBotStory } from "./compositions/crackbot.storytime";
import { FPS, FRAME_IN_MS, getVideoDuration } from "./lib/config";

export const RemotionRoot = () => (
  <>
    <Composition
      component={CrackBotReaction}
      durationInFrames={Math.ceil(getVideoDuration() / FRAME_IN_MS)}
      fps={FPS}
      height={1920}
      id="CRACKBOTREACTION"
      width={1080}
    />

    <Composition
      component={CrackBotStory}
      durationInFrames={Math.ceil(getVideoDuration() / FRAME_IN_MS)}
      fps={FPS}
      height={1920}
      id="CRACKBOTSTORY"
      width={1080}
    />
  </>
);
