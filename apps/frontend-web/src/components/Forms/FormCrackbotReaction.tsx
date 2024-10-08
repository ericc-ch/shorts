import { useCreateCrackbotReaction } from "@/lib/api/crackbot.reaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { payloadCrackBotReaction, renderOptions } from "schema";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

const formSchema = payloadCrackBotReaction.extend({
  renderOptions: renderOptions,
});

type FormValues = z.infer<typeof formSchema>;

export function FormCrackbotReaction() {
  const createCrackbotReaction = useCreateCrackbotReaction();

  const form = useForm<FormValues>({
    defaultValues: {
      backgroundVideoUrl: "",
      renderOptions: {
        language: "en-US",
        voice: "en-US-BrianNeural",
      },
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: FormValues) => {
    createCrackbotReaction.mutate(values, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="backgroundVideoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video URL</FormLabel>

              <FormControl>
                <Input
                  placeholder="https://youtube.com/shorts/xxx"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Crackbot will react to this video
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <p>Rendering Options</p>

        <FormField
          control={form.control}
          name="renderOptions.language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice Language</FormLabel>

              <FormControl>
                <Input placeholder="en-US" {...field} />
              </FormControl>
              <FormDescription>
                Unicode locales. Please refer to{" "}
                <a
                  className="underline"
                  href="https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry"
                >
                  IANA Language Subtag Registry
                </a>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="renderOptions.voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice Persona</FormLabel>

              <FormControl>
                <Input placeholder="en-US-BrianNeural" {...field} />
              </FormControl>
              <FormDescription>
                Voice persona for Crackbot. Please refer to{" "}
                <a
                  className="underline"
                  href="https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts"
                >
                  Language and voice support for the Speech service
                </a>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={createCrackbotReaction.isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
