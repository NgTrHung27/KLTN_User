"use client";

import { IconPicker } from "@/components/IconPicker";
import {
  FileState,
  MultiImageDropzone,
} from "@/components/multi-image-dropzone";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useEdgeStore } from "@/lib/edgestore";
import { PostSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Textarea,
} from "@nextui-org/react";
import { ChevronDown, Smile } from "lucide-react";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoImagesOutline } from "react-icons/io5";
import { z } from "zod";

interface ModalPostContentProps {
  logo: string | undefined;
  name: string;
  onClick: (value: boolean) => void;
  currentStatus: {
    label: string;
    icon: React.ReactNode;
  };
}

export const ModalPostContent = ({
  logo,
  name,
  onClick,
  currentStatus,
}: ModalPostContentProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [modeImage, setModeImage] = useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const { edgestore } = useEdgeStore();

  const onEmojiOpen = () => {
    setIsEmojiOpen((value) => !value);
  };

  useEffect(() => {
    enableInput();
  });

  const enableInput = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: "",
      postImages: [],
    },
  });

  const isDisabled = !form.formState.isDirty && fileStates.length === 0;

  const onIconSelect = (value: string) => {
    if (!inputRef.current) return;

    const newString = inputRef.current.value + value;

    form.setValue("content", newString);
    onEmojiOpen();
  };

  return (
    <Form {...form}>
      <form>
        <ModalContent className="bg-white text-primary dark:bg-background">
          <ModalHeader className="justify-center">
            Create a new post
          </ModalHeader>
          <Divider />
          <ScrollShadow className="max-h-[50vh]">
            <ModalBody>
              <div className="flex items-start gap-2">
                <Avatar src={logo} />
                <div className="flex flex-col items-start justify-start">
                  <p>{name}</p>
                  <Chip
                    onClick={() => onClick(true)}
                    as={Button}
                    radius="sm"
                    startContent={currentStatus.icon}
                    size="sm"
                    variant="shadow"
                    endContent={<ChevronDown className="h-4 w-4" />}
                    className="gap-1"
                  >
                    {currentStatus.label}
                  </Chip>
                </div>
              </div>
              <ScrollShadow className="relative max-h-[20vh]" hideScrollBar>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          ref={inputRef}
                          size="lg"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          placeholder="What are you thinking about?"
                          classNames={{
                            inputWrapper:
                              "min-h-[20vh] bg-transparent data-[hover=true]:bg-transparent group-data-[focus-visible=true]:bg-transparent group-data-[focus=true]:bg-transparent shadow-none p-0 group-data-[focus-visible=true]:ring-offset-0  group-data-[focus-visible=true]:ring-0",
                            input: "text-xl h-full scrollbar-hide",
                            innerWrapper: "flex-1",
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="absolute bottom-0 right-0">
                  <IconPicker
                    onOpen={onEmojiOpen}
                    isOpen={isEmojiOpen}
                    onClick={onIconSelect}
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full hover:cursor-pointer">
                      <Smile className="h-6 w-6" />
                    </div>
                  </IconPicker>
                </div>
              </ScrollShadow>

              {modeImage && (
                <MultiImageDropzone
                  value={fileStates}
                  onChange={(files) => setFileStates(files)}
                  onFilesAdded={() => {}}
                />
              )}
            </ModalBody>
          </ScrollShadow>
          <ModalFooter className="flex-col justify-center">
            <div className="flex items-center justify-between rounded-md border-2 border-zinc-200 p-3">
              <p>Add into your post</p>
              <button
                type="button"
                onClick={() => setModeImage((value) => !value)}
              >
                <IoImagesOutline className="text-2xl" />
              </button>
            </div>
            <Button
              isDisabled={isDisabled}
              type="submit"
              variant="shadow"
              color="primary"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Form>
  );
};
