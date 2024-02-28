"use client";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { DobInput } from "./dob-input";
import { GenderInput } from "./gender-input";
import { PhoneInput } from "./phone-input";
import { IdCardInput } from "./id-card-input";
import { CityInput } from "./city-input";
import { DistrictInput } from "./district-input";
import { WardInput } from "./ward-input";
import { AddressInput } from "./address-input";
import { useCities, useDistricts, useWards } from "@/hooks/use-country";
import { City, District, Ward } from "@/types";

interface ProfileTabProps {
  control: any;
  isLoading: boolean;
  city: string;
  district: string;
}

export const ProfileTab = ({
  control,
  isLoading,
  city,
  district,
}: ProfileTabProps) => {
  const cities: City[] = useCities() || [];
  const districts: District[] = useDistricts(city) || [];
  const wards: Ward[] = useWards(city, district) || [];
  return (
    <div className="space-y-4 ">
      <div className="grid grid-cols-2 gap-x-4">
        {/* Date of birth */}
        <FormField
          name="dob"
          control={control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <DobInput
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  isLoading={isLoading}
                  onSelectionChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Gender */}
        <FormField
          name="gender"
          control={control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <GenderInput
                  isInvalid={fieldState.invalid}
                  field={field}
                  isLoading={isLoading}
                  value={field.value}
                  errorMessage={fieldState.error?.message}
                  onValueChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Phone Number */}
        <FormField
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <PhoneInput
                  field={field}
                  isInvalid={fieldState.invalid}
                  isLoading={isLoading}
                  onValueChange={field.onChange}
                  errorMessage={fieldState.error?.message}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Id Card Number */}
        <FormField
          name="idCardNumber"
          control={control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <IdCardInput
                  field={field}
                  isInvalid={fieldState.invalid}
                  onValueChange={field.onChange}
                  isLoading={isLoading}
                  errorMessage={fieldState.error?.message}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <h1 className=" text-xl">Address</h1>
      {/* Select city */}
      <FormField
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              <CityInput
                cities={cities}
                field={field}
                isInvalid={fieldState.invalid}
                isLoading={isLoading}
                onSelectionChange={field.onChange}
                value={field.value}
                errorMessage={fieldState.error?.message}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex justify-between gap-x-4">
        {/* Select district */}
        <FormField
          name="district"
          control={control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <DistrictInput
                  districts={districts}
                  field={field}
                  isInvalid={fieldState.invalid}
                  isLoading={isLoading}
                  onSelectionChange={field.onChange}
                  errorMessage={fieldState.error?.message}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Select a ward */}
        <FormField
          name="ward"
          control={control}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <WardInput
                  field={field}
                  isInvalid={fieldState.invalid}
                  isLoading={isLoading}
                  onSelectionChange={field.onChange}
                  value={field.value}
                  errorMessage={fieldState.error?.message}
                  wards={wards}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* Address Line */}
      <FormField
        name="addressLine"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              <AddressInput
                field={field}
                isInvalid={fieldState.invalid}
                onValueChange={field.onChange}
                isLoading={isLoading}
                errorMessage={fieldState.error?.message}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
