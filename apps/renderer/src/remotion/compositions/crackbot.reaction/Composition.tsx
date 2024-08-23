import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
} from "remotion";
import { config, FRAME_IN_MS } from "../../lib/config";
import { Subtitle } from "./components/Subtitle";

// Custom fonts
import "@fontsource-variable/pixelify-sans";

export function CrackBotReaction() {
  const subtitles = config.payload.subtitles ?? [];

  const audioSrc = staticFile(
    config.payload.scriptPath?.split("/").at(-1) ?? "",
  );
  const videoSrc = staticFile(
    config.payload.backgroundVideoPath?.split("/").at(-1) ?? "",
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <AbsoluteFill>
        <OffthreadVideo
          style={{ objectFit: "cover" }}
          src={videoSrc}
          volume={0.5}
        />
      </AbsoluteFill>

      <Audio src={audioSrc} />

      {subtitles.map((subtitle, index) => (
        <Sequence
          key={index}
          from={subtitle.start / FRAME_IN_MS}
          durationInFrames={subtitle.duration / FRAME_IN_MS}
        >
          <Subtitle text={subtitle.text} />O
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
