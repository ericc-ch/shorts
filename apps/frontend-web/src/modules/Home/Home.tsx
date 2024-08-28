import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { queues } from "@/lib/api/queues";
import { useQuery } from "@tanstack/react-query";
import { Queue } from "api-schema/queue";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

import { DialogDetails } from "./components/DialogDetails";
import { DialogNew } from "./components/DialogNew";
import { VideoCard } from "./components/VideoCard";

export function Home() {
  const [selected, setSelected] = useState<Queue>();
  const isDialogOpen = Boolean(selected);

  const closeDialog = () => setSelected(undefined);

  const listQueuesQuery = useQuery(queues.list());
  const queuesData = listQueuesQuery.data ?? [];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Video Dashboard</h1>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button aria-label="Request new video generation">
              <PlusCircle className="mr-2 h-4 w-4" /> New Video
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Request new video generation</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {queuesData.map((queue) => (
          <VideoCard
            key={queue.id}
            onViewDetails={() => setSelected(queue)}
            queue={queue}
          />
        ))}
      </div>

      <DialogDetails
        onClose={closeDialog}
        onOpenChange={(open) => (open ? undefined : setSelected(undefined))}
        open={isDialogOpen}
        queue={selected}
      />

      <DialogNew />
    </div>
  );
}
