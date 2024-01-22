"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewPasswordSchema } from "@/schemas";

import { FormSuccess } from "../form-success";
import { useRouter, useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff, Key } from "lucide-react";
import { FormError } from "../form-error";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isVisible, setIsVisible] = useState(false);

  const { control, handleSubmit } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-8">
          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                onValueChange={(e) => field.onChange(e)}
                isDisabled={isPending}
                label="New password"
                labelPlacement="outside"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                size="md"
                placeholder="Enter your new password"
                startContent={<Key className="h-4 w-4" />}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                isRequired
              />
            )}
          />
          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                onValueChange={(e) => field.onChange(e)}
                isDisabled={isPending}
                label="Confirm Password"
                labelPlacement="outside"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                size="md"
                placeholder="Re-enter your password"
                startContent={<Key className="h-4 w-4" />}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                isRequired
              />
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          disabled={isPending}
          type="submit"
          className="w-full bg-[#7D1F1F] text-white"
        >
          Reset password
        </Button>
      </form>
    </CardWrapper>
  );
};
