"use client";

import { Button, Input, Radio, RadioGroup, Tab, Tabs } from "@nextui-org/react";
import { CardWrapper } from "./card-wrapper";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Key,
  Mail,
  NotebookText,
  NotepadText,
  Phone,
  Tag,
  User,
} from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { register as registerAction } from "@/action/register";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { DatePicker } from "../date-picker";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isVisible, setIsVisible] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<Date | undefined>(new Date("2006-01-01"));
  const [gender, setGender] = useState("Male");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [idCardNumber, setIdCardNumber] = useState<string>("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onDaySelected = (day: Date | undefined) => {
    if (day) {
      setDob(new Date(day));
    }

    return;
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
    defaultValues: {
      email,
      password,
      confirmPassword,
      name,
      dob,
      gender: gender,
      phoneNumber,
      idCardNumber,
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      registerAction(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const emailRegister = register("email");
  const passwordRegister = register("password");
  const confirmPasswordRegister = register("confirmPassword");
  const nameRegister = register("name");
  const phoneNumberRegister = register("phoneNumber");
  const idCardNumberRegister = register("idCardNumber");

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account? Login"
      backButtonHref="/auth/login"
      subLabel="Create account to manange your account today"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center">
          <Tabs
            size="sm"
            color="primary"
            variant="bordered"
            aria-label="Options"
            classNames={{
              cursor: "bg-[#7D1f1F]",
            }}
          >
            <Tab
              key="account"
              title={
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </div>
              }
              className="w-full"
            >
              <div className="space-y-8">
                <Input
                  value={email}
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
                  onValueChange={(value) => setEmail(value)}
                  {...emailRegister}
                />
                <Input
                  value={password}
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
                  onValueChange={(value) => setPassword(value)}
                  {...passwordRegister}
                />
                <Input
                  value={confirmPassword}
                  isDisabled={isPending}
                  label="Confirm password"
                  labelPlacement="outside"
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  size="sm"
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
                  errorMessage={errors.confirmPassword?.message}
                  isInvalid={!!errors.confirmPassword?.message}
                  isRequired
                  onValueChange={(value) => setConfirmPassword(value)}
                  {...confirmPasswordRegister}
                />
                <Input
                  value={name}
                  isDisabled={isPending}
                  label="Fullname"
                  labelPlacement="outside"
                  variant="bordered"
                  size="sm"
                  placeholder="Enter your fullname"
                  startContent={<Tag className="h-4 w-4" />}
                  errorMessage={errors.name?.message}
                  isInvalid={!!errors.name?.message}
                  isRequired
                  onValueChange={(value) => setName(value)}
                  {...nameRegister}
                />
              </div>
            </Tab>
            <Tab
              key="profile"
              title={
                <div className="flex items-center space-x-2">
                  <NotepadText className="h-4 w-4" />
                  <span>Profile</span>
                </div>
              }
              className="w-full"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-x-4">
                  <Input
                    readOnly
                    value={format(dob ?? "", "dd MMM, yyyy", { locale: vi })}
                    isDisabled={isPending}
                    label="Date of birth"
                    labelPlacement="outside"
                    variant="bordered"
                    size="sm"
                    placeholder="Enter your email"
                    endContent={
                      <DatePicker
                        onDaySelected={onDaySelected}
                        defaultMonth={dob}
                      />
                    }
                    errorMessage={errors.dob?.message}
                    isInvalid={!!errors.dob?.message}
                    isRequired
                    className="max-w-[150px]"
                  />
                  <RadioGroup
                    isRequired
                    orientation="horizontal"
                    size="sm"
                    label="Gender"
                    defaultValue={gender}
                    value={gender}
                    isInvalid={!!errors.gender}
                    errorMessage={errors.gender?.message}
                    onValueChange={(value) => {
                      if (gender !== value) {
                        setGender(value);
                        setValue("gender", value);
                      }
                    }}
                    classNames={{
                      label: "text-xs text-foreground",
                    }}
                  >
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                  </RadioGroup>
                </div>
                <div className="flex justify-between gap-x-4">
                  <Input
                    value={phoneNumber}
                    isDisabled={isPending}
                    label="Phone Number"
                    labelPlacement="outside"
                    variant="bordered"
                    size="sm"
                    placeholder="Enter your phone number"
                    startContent={<Phone className="h-4 w-4" />}
                    errorMessage={errors.phoneNumber?.message}
                    isInvalid={!!errors.phoneNumber?.message}
                    isRequired
                    onValueChange={(value) => setPhoneNumber(value)}
                    {...phoneNumberRegister}
                  />
                  <Input
                    value={idCardNumber}
                    isDisabled={isPending}
                    label="Identity Card Number"
                    labelPlacement="outside"
                    variant="bordered"
                    size="sm"
                    placeholder="Enter your ID Card Number"
                    startContent={<NotebookText className="h-4 w-4" />}
                    errorMessage={errors.idCardNumber?.message}
                    isInvalid={!!errors.idCardNumber?.message}
                    isRequired
                    onValueChange={(value) => setIdCardNumber(value)}
                    {...idCardNumberRegister}
                  />
                </div>
              </div>
            </Tab>
            <Tab
              key="education"
              title={
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Education</span>
                </div>
              }
            ></Tab>
          </Tabs>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            isLoading={isPending}
            isDisabled={!isValid || isPending}
            type="submit"
            className="mt-4 w-full bg-[#7D1F1F] font-semibold text-white"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};
