import { makeTransform, scale, translateY } from "@remotion/animation-utils";
import { fitText } from "@remotion/layout-utils";
import { AbsoluteFill, interpolate, useVideoConfig } from "remotion";
import { FONTS } from "~/src/remotion/lib/fonts";

interface Props {
  enterProgress: number;
  text: string;
  stroke: boolean;
}

export function Word({ enterProgress, text, stroke }: Props) {
  const { width } = useVideoConfig();
  const desiredFontSize = 120;

  const fittedText = fitText({
    fontFamily: FONTS.PIXELIFY_SANS,
    text,
    withinWidth: width * 0.8,
  });

  const fontSize = Math.min(desiredFontSize, fittedText.fontSize);

  return (
    <AbsoluteFill>
      <div
        style={{
          fontSize,
          color: "white",
          textAlign: "center",
          WebkitTextStroke: stroke ? "20px black" : undefined,
          transform: makeTransform([
            scale(interpolate(enterProgress, [0, 1], [0.8, 1])),
            translateY(interpolate(enterProgress, [0, 1], [50, 0])),
          ]),
          fontFamily: FONTS.PIXELIFY_SANS,
          textTransform: "uppercase",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
}
