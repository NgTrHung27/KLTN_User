"use client";

import { cn } from "@/lib/utils";
import { Button, Spinner } from "@nextui-org/react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

interface ProfileCoverImageProps {
  url?: string;
  preview?: boolean;
}

export const ProfileCoverImage = ({ url, preview }: ProfileCoverImageProps) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();

  return (
    <div
      className={cn(
        "group relative h-[25vh] w-full",
        !url && "bg-zinc-600",
        url && "bg-muted",
      )}
    >
      {!!url && <Image src={url} fill alt="cover" className="object-cover" />}
      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-x-2 opacity-0 group-hover:opacity-100">
          <Button
            disabled={loading}
            onClick={() => {}}
            className="text-xs text-muted-foreground"
            variant={"bordered"}
            size={"sm"}
          >
            {loading ? (
              <Spinner size={"sm"} />
            ) : (
              <ImageIcon className="mr-2 h-4 w-4" />
            )}
            Change cover
          </Button>
          <Button
            disabled={loading}
            onClick={() => {}}
            className="text-xs text-muted-foreground"
            variant={"bordered"}
            size={"sm"}
          >
            {loading ? <Spinner size={"sm"} /> : <X className="mr-2 h-4 w-4" />}
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};
