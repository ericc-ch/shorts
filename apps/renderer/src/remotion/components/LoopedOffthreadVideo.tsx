import { getVideoMetadata } from "@remotion/media-utils";
import { useCallback, useEffect, useState } from "react";
import {
  continueRender,
  delayRender,
  Loop,
  OffthreadVideo,
  type RemotionOffthreadVideoProps,
} from "remotion";

import { FRAME_IN_MS } from "../lib/config";

export function LoopedOffthreadVideo(props: RemotionOffthreadVideoProps) {
  const [duration, setDuration] = useState<number>();
  const [handle] = useState(() => delayRender());

  const fetchData = useCallback(async () => {
    const { durationInSeconds } = await getVideoMetadata(props.src);
    setDuration(durationInSeconds);
    continueRender(handle);
  }, [handle, props.src]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  if (duration === undefined) return;

  return (
    <Loop durationInFrames={Math.ceil((duration * 1000) / FRAME_IN_MS)}>
      <OffthreadVideo {...props} />
    </Loop>
  );
}
