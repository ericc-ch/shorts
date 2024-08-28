import { ObjectRenderer } from "@/components/ObjectRenderer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { videoUrl } from "@/lib/video-url";
import { DialogProps } from "@radix-ui/react-dialog";
import { Queue } from "api-schema/queue";
import { MouseEventHandler } from "react";

interface Props extends DialogProps {
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onMarkUploaded?: MouseEventHandler<HTMLButtonElement>;
  queue?: Queue;
}

export function DialogDetails({
  onClose,
  onMarkUploaded,
  queue,
  ...props
}: Props) {
  return (
    <Dialog {...props}>
      <DialogContent aria-describedby={undefined} className="md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{queue?.metadata?.title}</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 py-4">
          <video
            className="w-80 h-full rounded-lg"
            controls
            src={videoUrl(queue?.id ?? 0)}
          >
            Your browser does not support the video tag.
          </video>

          <Separator orientation="vertical" />

          <div className="max-h-72 overflow-auto">
            <ObjectRenderer data={queue} />
          </div>
        </div>
        <DialogFooter>
          {!queue?.isUploaded && (
            <Button onClick={onMarkUploaded}>Mark as Uploaded</Button>
          )}

          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
