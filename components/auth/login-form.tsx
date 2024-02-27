"use client";

import { login } from "@/actions/login";
import { DictionaryLanguage } from "@/data/dictionaries";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Link } from "@nextui-org/react";
import { Eye, EyeOff, Key, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { CardWrapper } from "./card-wrapper";

type LoginForm = z.infer<typeof LoginSchema>;

export const LoginForm = ({ dict }: { dict: DictionaryLanguage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginForm) => {
    setIsLoading(true);

    await login(values)
      .then((data) => {
        if (data) {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success(data.success);
          }
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <CardWrapper
      backButtonLabel={dict.Authentication.No_Account}
      backButtonHref="/auth/register"
      headerLabel={dict.Authentication.Login_Header}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-4"
        >
          <div className="flex w-full flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      autoFocus
                      isDisabled={isLoading}
                      label={dict.Authentication.Email_Label}
                      labelPlacement="outside"
                      variant="bordered"
                      size="md"
                      placeholder={dict.Authentication.Email_Placeholder}
                      startContent={<Mail className="size-4" />}
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      isRequired
                      onValueChange={field.onChange}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isDisabled={isLoading}
                      label={dict.Authentication.Password_Label}
                      labelPlacement="outside"
                      type={isVisible ? "text" : "password"}
                      variant="bordered"
                      size="md"
                      placeholder={dict.Authentication.Password_Placeholder}
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
                      isInvalid={fieldState.invalid}
                      isRequired
                      onValueChange={field.onChange}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Link
              size="sm"
              underline="hover"
              className="italic hover:cursor-pointer"
              href="/auth/reset"
            >
              {dict.Authentication.Forgot_Password}
            </Link>
          </div>
          <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            type="submit"
            className="mt-4 w-full bg-[#7D1F1F] font-semibold text-white"
          >
            {dict.Authentication.Login_Button}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
