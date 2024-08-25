import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { CrackBot } from "../../components/CrackBot";
import { LoopedOffthreadVideo } from "../../components/LoopedOffthreadVideo";
import { config, FRAME_IN_MS, getVideoDuration } from "../../lib/config";
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
        <LoopedOffthreadVideo
          durationInFrames={Math.ceil(getVideoDuration() / FRAME_IN_MS)}
          style={{ objectFit: "cover" }}
          src={videoSrc}
          volume={0.2}
        />
      </AbsoluteFill>

      <Audio src={audioSrc} />

      <AbsoluteFill style={{ top: '75%', left: '50%' }} >
        <CrackBot audioSrc={audioSrc} />
      </AbsoluteFill>

      <AbsoluteFill style={{ top: "65%" }}>
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
    </AbsoluteFill>
  );
}
