import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormEventHandler, useState } from "react";

const videoTypes = [
  "Tutorial",
  "Product Review",
  "Vlog",
  "News",
  "Entertainment",
];
const voiceOptions = ["Male 1", "Female 1", "Male 2", "Female 2"];
const languageOptions = ["English", "Spanish", "French", "German", "Japanese"];

export function DialogNew() {
  const [isNewVideoDialogOpen, setIsNewVideoDialogOpen] = useState(false);
  const [newVideoData, setNewVideoData] = useState({
    renderOptions: {
      language: "",
      voice: "",
    },
    videoType: "",
    videoUrl: "",
  });

  const handleNewVideoSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("New video request:", newVideoData);
    // Here you would typically send this data to your backend
    setIsNewVideoDialogOpen(false);
    // Reset form
    setNewVideoData({
      renderOptions: {
        language: "",
        voice: "",
      },
      videoType: "",
      videoUrl: "",
    });
  };

  return (
    <Dialog onOpenChange={setIsNewVideoDialogOpen} open={isNewVideoDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request New Video Generation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleNewVideoSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="videoType">
                Video Type
              </Label>
              <Select
                onValueChange={(value) =>
                  setNewVideoData({ ...newVideoData, videoType: value })
                }
                value={newVideoData.videoType}
              >
                <SelectTrigger className="col-span-3" id="videoType">
                  <SelectValue placeholder="Select video type" />
                </SelectTrigger>
                <SelectContent>
                  {videoTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="videoUrl">
                Video URL
              </Label>
              <Input
                className="col-span-3"
                id="videoUrl"
                onChange={(e) =>
                  setNewVideoData({
                    ...newVideoData,
                    videoUrl: e.target.value,
                  })
                }
                placeholder="TikTok or YouTube URL"
                value={newVideoData.videoUrl}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="voice">
                Voice
              </Label>
              <Select
                onValueChange={(value) =>
                  setNewVideoData({
                    ...newVideoData,
                    renderOptions: {
                      ...newVideoData.renderOptions,
                      voice: value,
                    },
                  })
                }
                value={newVideoData.renderOptions.voice}
              >
                <SelectTrigger className="col-span-3" id="voice">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  {voiceOptions.map((voice) => (
                    <SelectItem key={voice} value={voice}>
                      {voice}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="language">
                Language
              </Label>
              <Select
                onValueChange={(value) =>
                  setNewVideoData({
                    ...newVideoData,
                    renderOptions: {
                      ...newVideoData.renderOptions,
                      language: value,
                    },
                  })
                }
                value={newVideoData.renderOptions.language}
              >
                <SelectTrigger className="col-span-3" id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
