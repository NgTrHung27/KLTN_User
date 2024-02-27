"use client";

import { District } from "@/types";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Key } from "react";
import { GiStreetLight } from "react-icons/gi";

interface DistrictInputProps {
  field: any;
  districts: District[];
  onSelectionChange: (e: Key) => void;
  isLoading: boolean;
  value: string;
  errorMessage?: string;
  isInvalid: boolean;
}

export const DistrictInput = ({
  field,
  districts,
  onSelectionChange,
  isLoading,
  value,
  errorMessage,
  isInvalid,
}: DistrictInputProps) => {
  return (
    <Autocomplete
      defaultItems={districts}
      selectedKey={value}
      isDisabled={isLoading}
      label="District"
      labelPlacement="outside"
      variant="bordered"
      size="md"
      placeholder="Choose a district"
      startContent={<GiStreetLight className="text-xl font-thin" />}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      isRequired
      listboxProps={{
        itemClasses: {
          base: [
            "rounded-medium",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[pressed=true]:opacity-70",
            "data-[hover=true]:bg-default-200",
            "data-[selectable=true]:focus:bg-default-100",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      onSelectionChange={onSelectionChange}
      {...field}
    >
      {districts.length > 0 ? (
        districts.map((district) => (
          <AutocompleteItem key={district.Name}>
            {district.Name}
          </AutocompleteItem>
        ))
      ) : (
        <AutocompleteItem key={"Empty"}>
          <span>Please choose a city first</span>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
