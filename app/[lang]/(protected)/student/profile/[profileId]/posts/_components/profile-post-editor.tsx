"use client";

import { Avatar, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";

interface ProfilePostEditorProps {
  logo: string | undefined;
  onOpen: () => void;
}

export const ProfilePostEditor = ({ logo, onOpen }: ProfilePostEditorProps) => {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Avatar src={logo} />
        <Button
          onClick={onOpen}
          size="md"
          variant="shadow"
          className="flex-1 justify-start rounded-full text-zinc-600 dark:text-zinc-400"
        >
          Create your new post...
        </Button>
      </CardHeader>
    </Card>
  );
};
