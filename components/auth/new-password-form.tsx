"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { CardWrapper } from "./card-wrapper";

import { NewPasswordSchema } from "@/schemas";

import { newPassword } from "@/actions/new-password";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff, Key } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { toast } from "sonner";

type NewPasswordFormType = z.infer<typeof NewPasswordSchema>;

export const NewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isVisible, setIsVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NewPasswordFormType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    setIsLoading(true);

    await newPassword(values, token)
      .then((res) => {
        if (res.success) {
          toast.success(res.success);

          router.push("/auth/login");
        }

        if (res.error) {
          toast.error(res.error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const toggleVisibility = () => {
    setIsVisible(true);

    setTimeout(() => setIsVisible(false), 1000);
  };

  const toggleConfirmVisibility = () => {
    setConfirmVisible(true);

    setTimeout(() => setConfirmVisible(false), 1000);
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-8">
            {/* Password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isDisabled={isLoading}
                      label="New password"
                      labelPlacement="outside"
                      type={isVisible ? "text" : "password"}
                      variant="bordered"
                      size="md"
                      placeholder="Enter your new password"
                      startContent={<Key className="size-4" />}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      }
                      errorMessage={fieldState.error?.message}
                      isInvalid={!!fieldState.error}
                      isRequired
                      onValueChange={field.onChange}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Confirm Password */}
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isDisabled={isLoading}
                      label="Confirm Password"
                      labelPlacement="outside"
                      type={confirmVisible ? "text" : "password"}
                      variant="bordered"
                      size="md"
                      placeholder="Re-enter your password"
                      startContent={<Key className="size-4" />}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleConfirmVisibility}
                        >
                          {confirmVisible ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      }
                      errorMessage={fieldState.error?.message}
                      isInvalid={!!fieldState.error}
                      isRequired
                      onValueChange={field.onChange}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            type="submit"
            className="w-full bg-[#7D1F1F] text-white"
          >
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
