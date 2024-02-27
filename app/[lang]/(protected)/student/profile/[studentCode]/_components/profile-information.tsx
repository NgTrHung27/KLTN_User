"use client";

import { Label } from "@/components/ui/label";
import { Avatar, Card, CardBody, Divider, Textarea } from "@nextui-org/react";
import { Area, Biography, Social } from "@prisma/client";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { Cake, MapPin } from "lucide-react";

interface ProfileInformationProps {
  biography?: Biography;
  address: string;
  dob: Date;
  schoolName: string;
  schoolLogo: string;
  areas?: Area[];
  socials?: Social[];
}

export const ProfileInformation = ({
  biography,
  address,
  dob,
  schoolName,
  schoolLogo,
  areas,
  socials,
}: ProfileInformationProps) => {
  return (
    <Card>
      <CardBody className="flex flex-col gap-2">
        <Label className=" font-semibold">Biography</Label>
        <div className="flex flex-col items-start justify-center gap-2 text-sm">
          <Textarea
            value={"No description"}
            readOnly
            size="sm"
            variant="faded"
          />
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-2 size-4" />
            <p className="">
              {address.split(",")[2]}, {address.split(",")[3]}
            </p>
          </div>
          <div className="flex items-center truncate text-muted-foreground">
            <Cake className="mr-2 size-4" />
            {format(dob, "dd, MMMM, yyyy", { locale: vi })}
          </div>
          <div className="flex items-center gap-2 truncate text-muted-foreground">
            <Avatar size="sm" src={schoolLogo} className="h-6 w-6" />
            {schoolName}
          </div>
        </div>
        <Divider />
        <Label className=" font-semibold">Your areas</Label>
        {areas?.length! > 0 ? (
          <div>Your areas</div>
        ) : (
          <p className="text-xs italic text-muted-foreground">
            No areas specify, please add a new one related to your kind.
          </p>
        )}
        <Divider />
        <Label className=" font-semibold">Socials</Label>
        {socials?.length! > 0 ? (
          <div>Socials</div>
        ) : (
          <p className="text-xs italic text-muted-foreground">
            No socials specify, please add a new one related to your kind.
          </p>
        )}
      </CardBody>
    </Card>
  );
};
