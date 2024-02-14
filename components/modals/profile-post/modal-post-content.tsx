"use client";

import { CreateNewProfilePost } from "@/actions/profile-post";
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
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { PostStatus } from "@prisma/client";
import { ChevronDown, Smile } from "lucide-react";
import { useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoImagesOutline } from "react-icons/io5";
import { toast } from "sonner";
import { z } from "zod";

interface ModalPostContentProps {
  logo: string | undefined;
  name: string;
  onClick: (value: boolean) => void;
  currentStatus: {
    label: string;
    icon: React.ReactNode;
  };
  onClose: () => void;
}

export const ModalPostContent = ({
  logo,
  name,
  onClick,
  currentStatus,
  onClose,
}: ModalPostContentProps) => {
  const router = useRouter();

  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [modeImage, setModeImage] = useState(false);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const uploadImageProgress = (
    key: string,
    progress: FileState["progress"],
  ) => {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );

      if (fileState) {
        fileState.progress = progress;
      }

      return newFileStates;
    });
  };

  const onSubmit = async (values: z.infer<typeof PostSchema>) => {
    if (currentStatus.label === "Public") {
      values.status = PostStatus.PUBLIC;
    } else if (currentStatus.label === "Private") {
      values.status = PostStatus.PRIVATE;
    } else if (currentStatus.label === "Only friends") {
      values.status = PostStatus.FRIENDS;
    } else if (currentStatus.label === "Except for") {
      values.status = PostStatus.EXCEPT;
    }

    setIsLoading(true);
    if (fileStates) {
      setFileStates([...fileStates]);
      await Promise.all(
        fileStates.map(async (fileState) => {
          try {
            const res = await edgestore.publicFiles.upload({
              file: fileState.file as File,
              onProgressChange: async (progress) => {
                uploadImageProgress(fileState.key, progress);
                if (progress === 100) {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  uploadImageProgress(fileState.key, "COMPLETE");
                }
              },
            });

            values.postImages?.push(res.url);
          } catch (error) {
            uploadImageProgress(fileState.key, "ERROR");
          }
        }),
      );
    }

    await CreateNewProfilePost(values).then((res) => {
      if (res.success) {
        toast.success(res.success);
      }
      if (res.error) {
        toast.error(res.error);
      }
    });

    form.reset();
    setIsLoading(false);
    setFileStates([]);
    onClose();
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          isDisabled={isLoading}
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
                  disabled={isLoading}
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
            {!isLoading ? (
              <Button
                isDisabled={isDisabled}
                type="submit"
                variant="shadow"
                color="primary"
              >
                Create
              </Button>
            ) : (
              <div className="flex items-center justify-center">
                <Spinner size="lg" color="primary" />
              </div>
            )}
          </ModalFooter>
        </ModalContent>
      </form>
    </Form>
  );
};
