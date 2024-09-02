import { queues } from "@/lib/api/queues";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Queue } from "schema";

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

        <DialogNew />
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
        onMarkUploadedSuccess={closeDialog}
        onOpenChange={(open) => (open ? undefined : setSelected(undefined))}
        open={isDialogOpen}
        queue={selected}
      />
    </div>
  );
}
