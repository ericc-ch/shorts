import { FormCrackbotReaction } from "@/components/Forms/FormCrackbotReaction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { ReactNode, useState } from "react";
import { VIDEO_TYPE } from "schema";

const toFakeString = (type: VIDEO_TYPE) => type as unknown as string;

const options = [
  {
    label: "Crackbot Reaction",
    value: VIDEO_TYPE.CRACKBOT_REACTION,
  },
];

const formMap = new Map<VIDEO_TYPE, () => ReactNode>([
  [VIDEO_TYPE.CRACKBOT_REACTION, FormCrackbotReaction],
]);

export function DialogNew() {
  const [selected, setSelected] = useState<string>();

  const Form = formMap.get(selected as unknown as VIDEO_TYPE);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="Request new video generation">
          <PlusCircle className="mr-2 h-4 w-4" /> New Video
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby={undefined} className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Request New Video Generation</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <Select onValueChange={setSelected} value={selected}>
            <SelectTrigger id="videoType">
              <SelectValue placeholder="Select video type" />
            </SelectTrigger>
            <SelectContent>
              {options.map((type) => (
                <SelectItem key={type.value} value={toFakeString(type.value)}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {Form ?
            <Form />
          : undefined}
        </div>
      </DialogContent>
    </Dialog>
  );
}
