import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { Word } from "./Word";

interface Props {
  text: string;
}

export function Subtitle({ text }: Props) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    config: {
      damping: 200,
    },
    durationInFrames: 5,
    fps,
    frame,
  });

  // Overlay stroked text with normal text to create an effect where the stroke is outside
  return (
    <AbsoluteFill>
      <AbsoluteFill>
        <Word enterProgress={enter} stroke text={text} />
      </AbsoluteFill>
      <AbsoluteFill>
        <Word enterProgress={enter} stroke={false} text={text} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
