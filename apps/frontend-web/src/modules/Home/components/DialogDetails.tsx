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
import { useMarkQueueUploaded } from "@/lib/api/queues";
import { videoUrl } from "@/lib/video-url";
import { DialogProps } from "@radix-ui/react-dialog";
import { Queue } from "api-schema/queue";
import { MouseEventHandler } from "react";

interface Props extends DialogProps {
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onMarkUploadedSuccess?: MouseEventHandler<HTMLButtonElement>;
  queue?: Queue;
}

export function DialogDetails({
  onClose,
  onMarkUploadedSuccess,
  queue,
  ...props
}: Props) {
  const markAsUploaded = useMarkQueueUploaded();

  const handleMarkUploaded = () => {
    if (!queue) return;

    markAsUploaded.mutate([queue.id], {
      onSuccess: onMarkUploadedSuccess,
    });
  };

  return (
    <Dialog {...props}>
      <DialogContent aria-describedby={undefined} className="md:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{queue?.metadata?.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-4 py-4">
          <video
            className="w-80 h-full rounded-lg"
            controls
            src={videoUrl(queue?.id ?? 0)}
          >
            Your browser does not support the video tag.
          </video>

          <Separator className="hidden md:block" orientation="vertical" />

          <div className="max-h-72 overflow-auto">
            <ObjectRenderer data={queue} />
          </div>
        </div>
        <DialogFooter>
          {!queue?.isUploaded && (
            <Button onClick={handleMarkUploaded}>Mark as Uploaded</Button>
          )}

          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
