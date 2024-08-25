import { Composition } from "remotion";
import { CrackBotReaction } from "./compositions/crackbot.reaction";
import { FPS, FRAME_IN_MS, getVideoDuration } from "./lib/config";

export const RemotionRoot = () => (
  <Composition
    id="CRACKBOTREACTION"
    component={CrackBotReaction}
    durationInFrames={Math.ceil(getVideoDuration() / FRAME_IN_MS)}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
