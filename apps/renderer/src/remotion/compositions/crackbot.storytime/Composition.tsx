// Custom fonts
import "@fontsource-variable/pixelify-sans";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";

import { CrackBot } from "../../components/CrackBot";
import { LoopedOffthreadVideo } from "../../components/LoopedOffthreadVideo";
import { config, FRAME_IN_MS } from "../../lib/config";
import { Subtitle } from "./components/Subtitle";

export function CrackBotStory() {
  const subtitles = config.payload.subtitles ?? [];

  const audioSrc = staticFile(
    config.payload.scriptPath?.split("/").at(-1) ?? "",
  );
  const videoSrc = staticFile(
    config.payload.backgroundVideoPath?.split("/").at(-1) ?? "",
  );
  const musicSrc = staticFile(
    config.payload.musicVideoPath?.split("/").at(-1) ?? "",
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <AbsoluteFill>
        <LoopedOffthreadVideo
          src={videoSrc}
          style={{ objectFit: "cover" }}
          volume={0.1}
        />
      </AbsoluteFill>

      <Audio src={audioSrc} />
      <Audio src={musicSrc} volume={0.3} />

      <AbsoluteFill style={{ left: "50%", top: "75%" }}>
        <CrackBot audioSrc={audioSrc} />
      </AbsoluteFill>

      <AbsoluteFill style={{ top: "65%" }}>
        {subtitles.map((subtitle, index) => (
          <Sequence
            durationInFrames={subtitle.duration / FRAME_IN_MS}
            from={subtitle.start / FRAME_IN_MS}
            key={index}
          >
            <Subtitle text={subtitle.text} />
          </Sequence>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
