"use client";

import { UploadCloudIcon, X } from "lucide-react";
import { forwardRef, useMemo } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { IoIosImages } from "react-icons/io";

interface CommentImageDropzoneProps {
  value?: File | string;
  onChange?: (file?: File) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
}

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return "Invalid file type.";
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return "The file is not supported.";
  },
};

export const CommentImageDropzone = forwardRef<
  HTMLInputElement,
  CommentImageDropzoneProps
>(({ dropzoneOptions, value, onChange, disabled }, ref) => {
  const url = useMemo(() => {
    if (typeof value === "string") {
      // in case a url is passed in, use it to display the image
      return value;
    } else if (value) {
      // in case a file is passed in, create a base64 url to display the image
      return URL.createObjectURL(value);
    }
    return null;
  }, [value]);

  // dropzone configuration
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    disabled,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        void onChange?.(file);
      }
    },
    ...dropzoneOptions,
  });

  const errorMessage = useMemo(() => {
    if (fileRejections[0]) {
      const { errors } = fileRejections[0];
      if (errors[0]?.code === "file-too-large") {
        return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
      } else if (errors[0]?.code === "file-invalid-type") {
        return ERROR_MESSAGES.fileInvalidType();
      } else if (errors[0]?.code === "too-many-files") {
        return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
      } else {
        return ERROR_MESSAGES.fileNotSupported();
      }
    }
    return undefined;
  }, [fileRejections, dropzoneOptions]);

  return (
    <div {...getRootProps()} className="flex items-center justify-center">
      {/* Main File Input */}
      <input ref={ref} {...getInputProps()} />

      <Button disabled={disabled}>select</Button>
    </div>
  );
});

CommentImageDropzone.displayName = "CommentImageDropzone";

const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button type="button" ref={ref} {...props}>
      <IoIosImages className="h-6 w-6 text-zinc-600 dark:text-zinc-400 " />
    </button>
  );
});

Button.displayName = "Button";

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return "0 Bytes";
  }
  bytes = Number(bytes);
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const dm = 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
