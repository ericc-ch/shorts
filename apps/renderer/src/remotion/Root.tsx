import { Fragment } from "react/jsx-runtime";
import { Composition } from "remotion";
import { compositionMap } from "./compositions";
import { config, FPS, FRAME_IN_MS, getVideoDuration } from "./lib/config";

export const RemotionRoot = () => (
  <Composition
    id="shorts"
    component={compositionMap.get(config.type) ?? Fragment}
    durationInFrames={Math.ceil(getVideoDuration() / FRAME_IN_MS)}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
