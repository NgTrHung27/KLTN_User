"use client";

import { BiographyAdd } from "@/actions/Biography/addBio";
import { Label } from "@/components/ui/label";
import { Avatar, Button, Card, CardBody, Divider, Textarea } from "@nextui-org/react";
import { Area, Biography, Social } from "@prisma/client";
import { format, set } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { Cake, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, startTransition, useState } from "react";

interface ProfileInformationProps {
  biography: Biography;
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
  const [button, setButton] = useState(true);
  const [textValue, setTextValue] = useState(biography?.content)

  const onAddBio = () =>
  {
    setButton(prveButton => !prveButton);

  }
  const handleTextareaChange = (event: ChangeEvent<HTMLInputElement>) =>
  {
    setTextValue(event.target.value)
  }

  const params = useParams();
  const studentCode = params.studentCode as string;
  const router = useRouter();

  const onBiography =  async () => {
    startTransition(() => {
      BiographyAdd(studentCode,textValue);
      onAddBio
    })
    router.refresh();
  }

  return (
    <Card>
      <CardBody className="flex flex-col gap-2">
        <Label className=" font-semibold">Biography</Label>
        <div className="flex flex-col items-start justify-center gap-2 text-sm">
          { button && !biography?.content && (
          <Button
          onClick={onAddBio}
          className="w-full h-[40px]"
          >
            Add Biography
          </Button>
          )
          }
          {!button && (  
            <Textarea 
            onChange={e => handleTextareaChange(e)}
            value={textValue}
            size="sm"
            variant="faded"
            />  
            )}
          {
          button &&
          (<p className="mx-auto">
            {biography?.content || ""}
          </p>)
          }
            {button && biography?.content && (
            <Button
            onClick={onAddBio}
            className="w-full h-[40px]"
            >
              Update Biography
            </Button>
            )
            }
          <div className="flex">
            {
              !button && ( 
              <Button
              onClick={onAddBio}
                size="md"
                color="primary"
                variant="faded"
              >
                Cancle
              </Button>
               )
            }
            {
              !button && (
                <Button
                onClick={onBiography}
                color = "success"
                size="md"
                className="ml-2"
                >
                  Save
                </Button>
              )
            }
          </div>

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
