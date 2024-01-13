"use client";

import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { Eye, EyeOff, Key, Mail } from "lucide-react";
import { useState, useTransition } from "react";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/action/login";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const emailRegister = register("email");
  const passwordRegister = register("password");

  return (
    <CardWrapper headerLabel="Welcome back">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-4"
      >
        <div className="flex w-full flex-col gap-4">
          <Input
            isDisabled={isPending}
            label="Email"
            labelPlacement="outside"
            type="email"
            variant="bordered"
            size="sm"
            placeholder="Enter your email"
            startContent={<Mail className="h-4 w-4" />}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email?.message}
            isRequired
            {...emailRegister}
          />
          <Input
            isDisabled={isPending}
            label="Password"
            labelPlacement="outside"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            size="sm"
            placeholder="Enter your password"
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
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password?.message}
            isRequired
            {...passwordRegister}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          isLoading={isPending}
          isDisabled={!isValid || isPending}
          type="submit"
          className="w-full bg-[#7D1F1F] font-semibold text-white"
        >
          Login
        </Button>
      </form>
    </CardWrapper>
  );
};
