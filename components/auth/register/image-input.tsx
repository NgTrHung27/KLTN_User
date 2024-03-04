"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Image, Input } from "@nextui-org/react";

interface ImageInputPtops {
  field: any;
  onValueChange: () => void;
}

export const ImageInput = ({ field, onValueChange }: ImageInputPtops) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Input
          value="Hover to see detail"
          readOnly={true}
          label="Image Url"
          labelPlacement="outside"
          size="md"
          variant="faded"
          classNames={{
            input: "cursor-default",
          }}
          isClearable
          onValueChange={onValueChange}
          {...field}
        />
      </HoverCardTrigger>
      <HoverCardContent
        align="center"
        alignOffset={10}
        className="flex w-80 items-center justify-center rounded-md"
      >
        <Image
          width={300}
          src={field.value}
          alt="certificate-image"
          isZoomed
          isBlurred
          shadow="md"
        />
      </HoverCardContent>
    </HoverCard>
  );
};
