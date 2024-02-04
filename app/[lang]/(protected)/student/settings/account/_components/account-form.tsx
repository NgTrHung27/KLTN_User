"use client";

import {
  Accordion,
  AccordionItem,
  Chip,
  Divider,
  Input,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import { SettingsHeader } from "../../_components/settings-header";
import { ExtendedUser } from "@/auth";
import { useState, useTransition } from "react";
import { ActionModal } from "@/components/modals/action-modal";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { AccountFormSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Key, Mail } from "lucide-react";

interface AccountFormProps {
  user: Pick<ExtendedUser, "email" | "name" | "status" | "isTwoFactorEnabled">;
}

type AccountFormValues = z.infer<typeof AccountFormSchema>;

const status = {
  AWAITING: {
    label: "AWAITING FOR APPROVAL",
    color: "warning",
  },
  STUDYING: {
    label: "STUDYING",
    color: "primary",
  },
  DROPPED: {
    label: "DROPPED OUT OF SCHOOL",
    color: "default",
  },
  APPROVED: {
    label: "INFORMATION APPROVED",
    color: "success",
  },
};

export const AccountForm = ({ user }: AccountFormProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditting, setIsEditting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [isPending, startTransition] = useTransition();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(AccountFormSchema),
    defaultValues: {
      password: undefined,
      confirmPassword: undefined,
      email: user.email || undefined,
      isTwoFactorEnabled: user.isTwoFactorEnabled,
    },
  });

  const onCancel = () => {
    setIsEditting(false);
    onClose();

    form.reset();
  };

  const onSubmit = (values: AccountFormValues) => {
    console.log(values);

    setIsEditting(false);
  };

  return (
    <>
      <ActionModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onAction={onCancel}
        title="Are you sure to cancel?"
        description="All the information that you have changed will be dismiss."
      />
      <div className="space-y-6">
        <SettingsHeader
          title="Account"
          description="Update your account settings. Set your preferred name and security"
          showActions
          isEdit={isEditting}
          onConfirm={form.handleSubmit(onSubmit)}
          onCancel={onOpen}
          setIsEditting={() => setIsEditting((value) => !value)}
        />
        <Divider />
        <Form {...form}>
          <form className="flex flex-col gap-y-8 text-primary">
            <div className="flex items-center justify-between">
              <h1 className="text-sm">Student status:</h1>
              <Chip
                color={
                  status[user.status].color as
                    | "warning"
                    | "primary"
                    | "default"
                    | "success"
                }
              >
                {status[user.status].label}
              </Chip>
            </div>
            <Input
              isDisabled
              isRequired
              value={user.name!}
              label="Display name"
              labelPlacement="outside"
              description="Currently display name in your profile page, this will only be changed in profile page."
            />
            {isEditting && (
              <Accordion variant="bordered">
                <AccordionItem
                  key={1}
                  aria-label="Change password"
                  title="Password"
                  subtitle="Change your current password"
                  isCompact
                >
                  <div className="flex flex-col gap-y-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              onValueChange={(e) => field.onChange(e)}
                              isDisabled={isPending}
                              label="Password"
                              labelPlacement="outside"
                              type={isVisible ? "text" : "password"}
                              variant="bordered"
                              size="md"
                              placeholder="Enter your password"
                              startContent={
                                <Key className="h-4 w-4 text-primary" />
                              }
                              endContent={
                                <button
                                  className="focus:outline-none"
                                  type="button"
                                  onClick={toggleVisibility}
                                >
                                  {isVisible ? (
                                    <EyeOff className="h-4 w-4 text-primary" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-primary" />
                                  )}
                                </button>
                              }
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                              className="text-primary"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
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
                              startContent={
                                <Key className="h-4 w-4 text-primary" />
                              }
                              endContent={
                                <button
                                  className="focus:outline-none"
                                  type="button"
                                  onClick={toggleVisibility}
                                >
                                  {isVisible ? (
                                    <EyeOff className="h-4 w-4 text-primary" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-primary" />
                                  )}
                                </button>
                              }
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                              className="text-primary"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionItem>
              </Accordion>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      onValueChange={(e) => field.onChange(e)}
                      isReadOnly={!isEditting}
                      isRequired
                      label="Email"
                      labelPlacement="outside"
                      description="Change with your primary email. If the field value changed, an email verification will be sent to the new email."
                      startContent={<Mail className="h-4 w-4 text-primary" />}
                      isInvalid={fieldState.invalid}
                      errorMessage={fieldState.error?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {!isEditting ? (
              <div className="flex items-center justify-between">
                <h1 className="text-sm">Two factor authentication:</h1>
                <Chip color={user.isTwoFactorEnabled ? "success" : "default"}>
                  {user.isTwoFactorEnabled ? "ON" : "OFF"}
                </Chip>
              </div>
            ) : (
              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Two Factor Authentication</FormLabel>
                      <FormDescription className="text-xs text-foreground-400">
                        With this enabled, you would need to enter confimation
                        code every time you logged in, confimation code will be
                        sent via your email.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
      </div>
    </>
  );
};
