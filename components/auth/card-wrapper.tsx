"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { Header } from "./header";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  subLabel?: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  subLabel,
  backButtonHref,
  backButtonLabel,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] light">
      <CardHeader>
        <Header label={headerLabel} subLabel={subLabel} />
      </CardHeader>
      <CardBody>{children}</CardBody>
      <Divider />
      <CardFooter className="flex items-center justify-center">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
