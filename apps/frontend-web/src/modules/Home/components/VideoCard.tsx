import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMarkQueueUploaded } from "@/lib/api/queues";
import { videoUrl } from "@/lib/video-url";
import { Queue } from "api-schema/queue";
import { AlertCircle, CheckCircle, PlayCircle, Upload } from "lucide-react";
import { MouseEventHandler } from "react";

interface Props {
  onMarkUploadedSuccess?: MouseEventHandler<HTMLButtonElement>;
  onViewDetails?: MouseEventHandler<HTMLButtonElement>;
  queue: Queue;
}

export function VideoCard({
  onMarkUploadedSuccess,
  onViewDetails,
  queue,
}: Props) {
  const markAsUploaded = useMarkQueueUploaded();

  const handleMarkUploaded = () => {
    if (!queue) return;

    markAsUploaded.mutate([queue.id], {
      onSuccess: onMarkUploadedSuccess,
    });
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{queue.metadata?.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow relative">
        {queue.isRendered ?
          <video
            aria-label={`Preview of ${queue.metadata?.title}. Click to view details.`}
            autoPlay
            className="w-full h-48 object-cover rounded-md"
            loop
            muted
            playsInline
            src={videoUrl(queue.id)}
          >
            Your browser does not support the video tag.
          </video>
        : <div className="w-full h-48 bg-muted flex items-center justify-center rounded-md">
            <PlayCircle
              aria-hidden="true"
              className="h-12 w-12 text-muted-foreground"
            />
            <span className="sr-only">Video not rendered</span>
          </div>
        }
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4">
        <div aria-label="Video status" className="flex flex-wrap gap-2">
          <Badge variant={queue.isScriptGenerated ? "default" : "secondary"}>
            {queue.isScriptGenerated ?
              <CheckCircle aria-hidden="true" className="mr-1 h-3 w-3" />
            : <AlertCircle aria-hidden="true" className="mr-1 h-3 w-3" />}
            <span>
              Script {queue.isScriptGenerated ? "Generated" : "Not Generated"}
            </span>
          </Badge>

          <Badge variant={queue.isRendered ? "default" : "secondary"}>
            {queue.isRendered ?
              <CheckCircle aria-hidden="true" className="mr-1 h-3 w-3" />
            : <AlertCircle aria-hidden="true" className="mr-1 h-3 w-3" />}
            <span>{queue.isRendered ? "Rendered" : "Not Rendered"}</span>
          </Badge>

          <Badge variant={queue.isUploaded ? "default" : "secondary"}>
            {queue.isUploaded ?
              <CheckCircle aria-hidden="true" className="mr-1 h-3 w-3" />
            : <AlertCircle aria-hidden="true" className="mr-1 h-3 w-3" />}
            <span>{queue.isUploaded ? "Uploaded" : "Not Uploaded"}</span>
          </Badge>
        </div>

        <div className="flex gap-2 w-full">
          <Button
            className="flex-grow"
            onClick={onViewDetails}
            variant="outline"
          >
            View Details
          </Button>

          {!queue.isUploaded && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label={`Mark ${queue.metadata?.title} as uploaded`}
                  onClick={handleMarkUploaded}
                  size="icon"
                  variant="outline"
                >
                  <Upload aria-hidden="true" className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mark as uploaded</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
