"use client";

import { IconPicker } from "@/components/IconPicker";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { CommentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Image, Input, Spinner, Textarea } from "@nextui-org/react";
import { SendHorizonal, Smile, XIcon } from "lucide-react";
import { ElementRef, KeyboardEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CommentImageDropzone } from "./single-image-comment";
import { toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";
import { Comment } from "@/actions/comment";
import { useRouter } from "next/navigation";

interface ProfileCommentFormProps {
  logo: string;
  postId: string;
  parentId?: string;
  onLoad?: () => void;
}

export const ProfileCommentForm = ({
  logo,
  postId,
  parentId,
  onLoad,
}: ProfileCommentFormProps) => {
  const router = useRouter();

  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [isDisabled, setIsDisabled] = useState(false);

  const createImageUrl = (file?: File) => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return undefined;
  };

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: "",
      image: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const [isValue, setIsValue] = useState(form.formState.isDirty);

  const inputRef = useRef<ElementRef<"textarea">>(null);

  const enableInput = () => {
    if (!inputRef.current) return;

    inputRef.current.selectionStart = inputRef.current.value.length;
  };

  const onSubmit = async (values: z.infer<typeof CommentSchema>) => {
    if (file) {
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: async (progress) => {
            setIsDisabled(true);
            if (progress === 100) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              setIsDisabled(false);
            }
          },
        });

        values.image = res.url;
      } catch (error) {
        toast.error("Error while uploading comment image");
      }
    }

    await Comment(values, postId, parentId).then((res) => {
      if (res.success) {
      }
      if (res.error) {
        toast.error(res.error);
      }
    });

    form.reset();
    setIsDisabled(false);
    setFile(undefined);
    setIsValue(false);
    router.refresh();
    onLoad?.();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (isSubmitting) return;
    if (event.key === "Enter" && !event.shiftKey) {
      form.handleSubmit(onSubmit);
    }
  };
  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-1 items-center gap-2">
              <Avatar src={logo} />
              <FormControl>
                {!isValue ? (
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    value={field.value}
                    onValueChange={() => {
                      setIsValue(true);

                      field.onChange;
                    }}
                    autoFocus
                    variant="faded"
                    radius="sm"
                    placeholder="Write a comment..."
                    className="flex-1 break-words"
                    size="sm"
                    endContent={
                      <div className="flex items-center justify-center gap-2">
                        <IconPicker
                          isOpen={isEmojiOpen}
                          onOpen={() => setIsEmojiOpen((value) => !value)}
                          onClick={(icon) => {
                            setIsValue(true);
                            form.setValue("content", `${field.value} ${icon}`);
                          }}
                        >
                          <Smile className="h-6 w-6 text-zinc-600 hover:cursor-pointer dark:text-zinc-400" />
                        </IconPicker>
                        <CommentImageDropzone
                          disabled={isDisabled}
                          value={file}
                          onChange={(file) => {
                            setIsValue(true);
                            setFile(file);
                          }}
                        />
                      </div>
                    }
                    classNames={{
                      inputWrapper:
                        "group-data-[focus-visible=true]:ring-offset-0  group-data-[focus-visible=true]:ring-0",
                    }}
                  />
                ) : (
                  <Textarea
                    {...field}
                    disabled={isSubmitting}
                    ref={inputRef}
                    onKeyDown={onKeyDown}
                    autoFocus
                    onFocus={(e) => {
                      enableInput();
                    }}
                    value={field.value}
                    onValueChange={(e) => {
                      if (e === "" && !file) {
                        setIsValue(false);
                      }

                      field.onChange;
                    }}
                    variant="faded"
                    endContent={
                      <div className="flex w-full items-center justify-center gap-2">
                        <IconPicker
                          isOpen={isEmojiOpen}
                          onOpen={() => setIsEmojiOpen((value) => !value)}
                          onClick={(icon) => {
                            form.setValue("content", `${field.value} ${icon}`);
                          }}
                        >
                          <Smile className="h-6 w-6 text-zinc-600 hover:cursor-pointer dark:text-zinc-400" />
                        </IconPicker>
                        <CommentImageDropzone
                          disabled={isDisabled}
                          value={file}
                          onChange={(file) => {
                            setIsValue(true);
                            setFile(file);
                          }}
                        />
                        <button type="submit" className="ml-auto">
                          <SendHorizonal
                            onClick={() => form.handleSubmit(onSubmit)}
                            className=" h-6 w-6 text-primary hover:cursor-pointer"
                          />
                        </button>
                      </div>
                    }
                    classNames={{
                      innerWrapper: "flex-col",
                      inputWrapper:
                        "group-data-[focus-visible=true]:ring-offset-0  group-data-[focus-visible=true]:ring-0",
                    }}
                  />
                )}
              </FormControl>
            </FormItem>
          )}
        />
        {file && (
          <div className="ml-[calc(48px)] mt-2 flex w-auto justify-between">
            <Image
              alt="comment image"
              src={createImageUrl(file)}
              isBlurred={isDisabled}
              classNames={{
                img: "max-h-[100px] object-cover",
                wrapper: "max-h-[100px] aspect-video",
              }}
            />
            {!isDisabled ? (
              <XIcon
                onClick={() => {
                  if (form.getValues("content") === "") {
                    setIsValue(false);
                  }
                  setFile(undefined);
                }}
                className="h-6 w-6 text-zinc-600 hover:cursor-pointer dark:text-zinc-400"
              />
            ) : (
              <Spinner color="primary" size="lg" />
            )}
          </div>
        )}
      </form>
    </Form>
  );
};
