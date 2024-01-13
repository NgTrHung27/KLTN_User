"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Header } from "./header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
}

export const CardWrapper = ({ children, headerLabel }: CardWrapperProps) => {
  return (
    <Card className="w-[400px] light">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};
