"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { CardWrapper } from "./card-wrapper";

import { ResetSchema } from "@/schemas";

import { Button, Input } from "@nextui-org/react";
import { Mail } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useState } from "react";
import { reset } from "@/actions/reset";
import { toast } from "sonner";

type ResetFormType = z.infer<typeof ResetSchema>;

export const ResetForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResetFormType>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ResetFormType) => {
    setIsLoading(true);

    await reset(values)
      .then((res) => {
        if (res.success) {
          toast.success(res.success);
        }

        if (res.error) {
          toast.error(res.error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      onValueChange={(e) => field.onChange(e)}
                      isDisabled={isLoading}
                      label="Email"
                      labelPlacement="outside"
                      type="email"
                      variant="bordered"
                      size="md"
                      placeholder="Enter your email"
                      startContent={<Mail className="size-4" />}
                      errorMessage={fieldState.error?.message}
                      isInvalid={!!fieldState.error}
                      isRequired
                      isClearable
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            type="submit"
            className="w-full bg-[#7D1F1F] text-white"
            variant="shadow"
          >
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
