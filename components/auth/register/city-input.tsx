"use client";

import { City } from "@/types";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Key } from "react";
import { BiSolidCity } from "react-icons/bi";

interface CityInputProps {
  field: any;
  cities: City[];
  onSelectionChange: (e: Key) => void;
  isLoading: boolean;
  value: string;
  errorMessage?: string;
  isInvalid: boolean;
}

export const CityInput = ({
  field,
  cities,
  onSelectionChange,
  isLoading,
  value,
  errorMessage,
  isInvalid,
}: CityInputProps) => {
  return (
    <Autocomplete
      defaultItems={cities}
      selectedKey={value}
      isDisabled={isLoading}
      label="City"
      labelPlacement="outside"
      variant="bordered"
      size="md"
      placeholder="Choose a city"
      startContent={<BiSolidCity className="text-xl font-thin" />}
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
      {...field}
      onSelectionChange={onSelectionChange}
    >
      {cities.map((city) => (
        <AutocompleteItem key={city.Name}>{city.Name}</AutocompleteItem>
      ))}
    </Autocomplete>
  );
};
