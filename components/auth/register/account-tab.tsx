"use client";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { ConfirmPasswordInput } from "./confirm-password";
import { EmailInput } from "./email-input";
import { NameInput } from "./name-input";
import { PasswordInput } from "./password-input";

interface AccountTabProps {
  control: any;
  isLoading: boolean;
}

export const AccountTab = ({ control, isLoading }: AccountTabProps) => {
  return (
    <div className="space-y-8">
      {/* Email Field */}
      <FormField
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              <EmailInput
                errorMessage={fieldState.error?.message}
                field={field}
                isInvalid={fieldState.invalid}
                onValueChange={field.onChange}
                isLoading={isLoading}
              />
            </FormControl>
          </FormItem>
        )}
      />
      {/* Password */}
      <FormField
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              <PasswordInput
                isInvalid={fieldState.invalid}
                isLoading={isLoading}
                onValueChange={field.onChange}
                errorMessage={fieldState.error?.message}
                field={field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      {/* Confirm Password */}
      <FormField
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              <ConfirmPasswordInput
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
      {/* Name */}
      <FormField
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              <NameInput
                field={field}
                isInvalid={fieldState.invalid}
                onValueChange={field.onChange}
                errorMessage={fieldState.error?.message}
                isLoading={isLoading}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
