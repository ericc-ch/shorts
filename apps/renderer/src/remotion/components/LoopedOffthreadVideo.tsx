import {
  Loop,
  OffthreadVideo,
  type RemotionOffthreadVideoProps,
} from "remotion";

interface Props extends RemotionOffthreadVideoProps {
  durationInFrames: number;
}

export function LoopedOffthreadVideo({ durationInFrames, ...props }: Props) {
  return (
    <Loop durationInFrames={durationInFrames}>
      <OffthreadVideo {...props} />
    </Loop>
  );
}
