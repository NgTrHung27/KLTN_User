"use client";

import { Ward } from "@/types";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Key } from "react";
import { FaStreetView } from "react-icons/fa6";

interface WardInputProps {
  field: any;
  wards: Ward[];
  onSelectionChange: (e: Key) => void;
  isLoading: boolean;
  value: string;
  errorMessage?: string;
  isInvalid: boolean;
}

export const WardInput = ({
  field,
  wards,
  onSelectionChange,
  isLoading,
  value,
  errorMessage,
  isInvalid,
}: WardInputProps) => {
  return (
    <Autocomplete
      defaultItems={wards}
      selectedKey={value}
      isDisabled={isLoading}
      label="Ward"
      labelPlacement="outside"
      variant="bordered"
      size="md"
      placeholder="Choose a ward"
      startContent={<FaStreetView className="text-xl font-thin" />}
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
      {wards.length > 0 ? (
        wards.map((ward) => (
          <AutocompleteItem key={ward.Name}>{ward.Name}</AutocompleteItem>
        ))
      ) : (
        <AutocompleteItem key={"Empty"}>
          <span>Please choose a city/district first</span>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
