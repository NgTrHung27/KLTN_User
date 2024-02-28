"use client";

import { RegisterSchema } from "@/schemas";
import { SchoolLib } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Spinner, Tab, Tabs } from "@nextui-org/react";
import { Gender, GradeType } from "@prisma/client";
import { GraduationCap, NotepadText, User } from "lucide-react";
import { useEffect, useState } from "react";
import "react-day-picker/dist/style.css";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form } from "../ui/form";
import { CardWrapper } from "./card-wrapper";
import { AccountTab } from "./register/account-tab";
import { EducationTab } from "./register/education-tab";
import { ProfileTab } from "./register/profile-tab";
import { register } from "@/actions/register";
import { useRouter } from "next/navigation";

interface RegisterFormProps {
  schools: SchoolLib[];
}

export type RegisterFormType = z.infer<typeof RegisterSchema>;

export const RegisterForm = ({ schools }: RegisterFormProps) => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      dob: new Date("2006-01-01"),
      gender: Gender.MALE,
      phoneNumber: "",
      idCardNumber: "",
      city: "",
      district: "",
      ward: "",
      addressLine: "",
      schoolName: "",
      programName: "",
      degreeType: undefined,
      certificateType: undefined,
      gradeType: GradeType.GPA,
      gradeScore: "1",
    },
  });

  const onSubmit = async (values: RegisterFormType) => {
    setIsLoading(true);

    await register(values)
      .then((res) => {
        console.log(res);
        if (res.success) {
          toast.success(res.success);
          setTimeout(() => router.push("/auth/login"), 3000);
        }

        if (res.error) {
          toast.error(res.error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onValidateSubmit = () => {
    if (form.formState.isSubmitting) return;
    if (!form.formState.isValid) {
      toast.error("Please enter all the information");
      return;
    }
  };

  form.watch("schoolName");
  form.watch("certificateImg");
  form.watch("gradeType");

  const programs =
    schools.find((school) => school.name === form.getValues("schoolName"))
      ?.programs || [];

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account? Login"
      backButtonHref="/auth/login"
      subLabel="Create account to manange your account today"
    >
      {!mounted ? (
        <Spinner label="Please wait while loading..." />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-h-[70vh] overflow-y-auto scrollbar-hide"
          >
            <div className="flex flex-col items-center justify-center">
              <Tabs
                size="md"
                color="primary"
                variant="bordered"
                aria-label="Options"
                className="flex-1"
                classNames={{
                  cursor: "bg-[#7D1f1F]",
                  tabList: "mb-3",
                  tabContent: "group-data-[selected=true]:dark:text-primary",
                }}
              >
                {/* Account */}
                <Tab
                  key="account"
                  title={
                    <div className="flex items-center space-x-2">
                      <User className="size-4" />
                      <span>Account</span>
                    </div>
                  }
                  className="w-full"
                >
                  <AccountTab control={form.control} isLoading={isLoading} />
                </Tab>
                {/* Profile */}
                <Tab
                  key="profile"
                  title={
                    <div className="flex items-center space-x-2">
                      <NotepadText className="size-4" />
                      <span>Profile</span>
                    </div>
                  }
                  className="w-full"
                >
                  <ProfileTab
                    city={form.getValues("city")}
                    control={form.control}
                    district={form.getValues("district")}
                    isLoading={isLoading}
                  />
                </Tab>
                {/* Education */}
                <Tab
                  key="education"
                  title={
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="size-4" />
                      <span>Education</span>
                    </div>
                  }
                  className="w-full"
                >
                  <EducationTab
                    control={form.control}
                    ctfImg={form.getValues("certificateImg")}
                    ctfType={form.getValues("certificateType")}
                    gradeType={form.getValues("gradeType")}
                    isLoading={isLoading}
                    onFileChange={(e) => form.setValue("certificateImg", e)}
                    programs={programs}
                    schoolName={form.getValues("schoolName")}
                    schools={schools}
                  />
                </Tab>
              </Tabs>
              <Button
                onClick={onValidateSubmit}
                isLoading={isLoading}
                isDisabled={isLoading}
                type="submit"
                className="mt-4 w-full bg-[#7D1F1F] font-semibold text-white"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
};
