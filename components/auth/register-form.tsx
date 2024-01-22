"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Image,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { CardWrapper } from "./card-wrapper";
import {
  Calendar,
  Eye,
  EyeOff,
  File,
  GraduationCap,
  Home,
  Key,
  Mail,
  NotebookText,
  NotepadText,
  Phone,
  Tag,
  User,
} from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import "react-day-picker/dist/style.css";
import { useCities, useDistricts, useWards } from "@/hooks/use-country";
import { BiSolidCity } from "react-icons/bi";
import { GiStreetLight } from "react-icons/gi";
import { FaStreetView } from "react-icons/fa6";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { vi } from "date-fns/locale/vi";
import { CertificateType, DegreeType, Gender, GradeType } from "@prisma/client";
import { CertificateImageModal } from "../modals/certificate-image-modal";
import { useEdgeStore } from "@/lib/edgestore";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { register } from "@/action/register";
import { SchoolWithPrograms } from "@/types";

interface RegisterFormProps {
  schools:
    | Pick<SchoolWithPrograms, "name" | "logoUrl" | "programs">[]
    | undefined;
}

export const RegisterForm = ({ schools }: RegisterFormProps) => {
  const [mounted, setMounted] = useState(false);

  const { edgestore } = useEdgeStore();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [isVisible, setIsVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const oldestMonth = new Date("1970-01-01");
  const latestMonth = new Date("2006-12-01");
  const [month, setMonth] = useState<Date>(new Date(latestMonth));

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  const footer = (
    <div className="mt-4 flex items-center justify-between">
      <Button onClick={() => setMonth(oldestMonth)} size="sm">
        Go to oldest
      </Button>
      <Button onClick={() => setMonth(latestMonth)} size="sm">
        Go to latest
      </Button>
    </div>
  );

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };
  };

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
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

  watch("city");
  watch("district");
  watch("ward");
  watch("schoolName");
  watch("certificateType");
  watch("certificateImg");
  watch("gradeType");

  const cities = useCities() || [];
  const districts = useDistricts(getValues("city")) || [];
  const wards = useWards(getValues("city"), getValues("district")) || [];

  const programs = schools?.find(
    (school) => school.name === getValues("schoolName"),
  )?.programs;

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const onUpload = async (file?: File) => {
    setIsUploading(true);
    if (file) {
      const res = await edgestore.publicFiles.upload({ file });

      setValue("certificateImg", res.url);
    }
    setOpen(false);
    setIsUploading(false);
  };

  console.log(programs);

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-center">
            <Tabs
              size="md"
              color="primary"
              variant="bordered"
              aria-label="Options"
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
                    <User className="h-4 w-4" />
                    <span>Account</span>
                  </div>
                }
                className="w-full"
              >
                <div className="space-y-8">
                  {/* Email Field */}
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        onValueChange={(e) => field.onChange(e)}
                        isDisabled={isPending}
                        label="Email"
                        labelPlacement="outside"
                        type="email"
                        variant="bordered"
                        size="md"
                        placeholder="Enter your email"
                        startContent={<Mail className="h-4 w-4" />}
                        errorMessage={fieldState.error?.message}
                        isInvalid={!!fieldState.error}
                        isRequired
                        isClearable
                      />
                    )}
                  />
                  {/* Password */}
                  <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        onValueChange={(e) => field.onChange(e)}
                        isDisabled={isPending}
                        label="Password"
                        labelPlacement="outside"
                        type="password"
                        variant="bordered"
                        size="md"
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
                        type="password"
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
                  {/* Name */}
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        onValueChange={(e) => field.onChange(e)}
                        isDisabled={isPending}
                        label="Fullname"
                        labelPlacement="outside"
                        variant="bordered"
                        size="md"
                        placeholder="Enter your fullname"
                        startContent={<Tag className="h-4 w-4" />}
                        errorMessage={fieldState.error?.message}
                        isInvalid={!!fieldState.error}
                        isRequired
                        isClearable
                      />
                    )}
                  />
                </div>
              </Tab>
              {/* Profile */}
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
                <div className="space-y-4 ">
                  <div className="grid grid-cols-2 gap-x-4">
                    {/* Date of birth */}
                    <Controller
                      name="dob"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Popover
                          placement="right"
                          showArrow
                          offset={10}
                          backdrop="transparent"
                        >
                          <PopoverTrigger>
                            <Input
                              readOnly
                              value={
                                field.value
                                  ? format(field.value, "dd MMMM, yyyy", {
                                      locale: vi,
                                    })
                                  : "Pick a date"
                              }
                              isDisabled={isPending}
                              label="Date of birth"
                              labelPlacement="outside"
                              variant="bordered"
                              size="md"
                              startContent={<Calendar className="h-4 w-4" />}
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              isRequired
                            />
                          </PopoverTrigger>
                          <PopoverContent className="w-full">
                            <DayPicker
                              selected={field.value}
                              onSelect={field.onChange}
                              mode="single"
                              month={month}
                              captionLayout="dropdown-buttons"
                              showOutsideDays
                              fixedWeeks
                              fromYear={1970}
                              toYear={2006}
                              footer={footer}
                              onMonthChange={setMonth}
                              locale={vi}
                              classNames={{
                                table: "w-full mx-auto",
                                caption_dropdowns: "text-primary",
                                caption_label: "hidden",
                                nav: "text-primary",
                                cell: "text-primary",
                                dropdown:
                                  "relative z-1 inline-flex items-center m-0 p-2 whitespace-nowrap text-priamry border-2 border-transparent text-lg font-bold dark:bg-[#18181b]",
                                head_row: "text-primary",
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                    {/* Gender */}
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field, fieldState }) => (
                        <RadioGroup
                          {...field}
                          onValueChange={(e) => field.onChange(e)}
                          orientation="horizontal"
                          isDisabled={isPending}
                          label="Gender"
                          size="md"
                          defaultValue={field.value}
                          errorMessage={fieldState.error?.message}
                          isInvalid={!!fieldState.error}
                          isRequired
                          classNames={{
                            label: "text-sm text-primary",
                          }}
                        >
                          <Radio value={Gender.MALE}>Male</Radio>
                          <Radio value={Gender.FEMALE}>Female</Radio>
                        </RadioGroup>
                      )}
                    />
                  </div>
                  <div className="flex justify-between gap-x-4">
                    {/* Phone Number */}
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          onValueChange={(e) => field.onChange(e)}
                          isDisabled={isPending}
                          label="Phone Number"
                          labelPlacement="outside"
                          variant="bordered"
                          size="md"
                          placeholder="Enter your phone number"
                          startContent={<Phone className="h-4 w-4" />}
                          errorMessage={fieldState.error?.message}
                          isInvalid={!!fieldState.error}
                          isRequired
                          isClearable
                        />
                      )}
                    />
                    {/* Id Card Number */}
                    <Controller
                      name="idCardNumber"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          onValueChange={(e) => field.onChange(e)}
                          isDisabled={isPending}
                          label="Identity Card Number"
                          labelPlacement="outside"
                          variant="bordered"
                          size="md"
                          placeholder="Enter your identity card number"
                          startContent={<NotebookText className="h-4 w-4" />}
                          errorMessage={fieldState.error?.message}
                          isInvalid={!!fieldState.error}
                          isRequired
                          isClearable
                        />
                      )}
                    />
                  </div>
                  <h1 className=" text-xl">Address</h1>
                  {/* Select city */}
                  <Controller
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Autocomplete
                        {...field}
                        defaultItems={cities}
                        onSelectionChange={(e) => {
                          field.onChange(e);
                        }}
                        selectedKey={field.value}
                        isDisabled={isPending}
                        label="City"
                        labelPlacement="outside"
                        variant="bordered"
                        size="md"
                        placeholder="Choose a city"
                        startContent={
                          <BiSolidCity className="text-xl font-thin" />
                        }
                        errorMessage={fieldState.error?.message}
                        isInvalid={!!fieldState.error}
                        isRequired
                        listboxProps={{
                          itemClasses: {
                            base: [
                              "rounded-medium",
                              "text-default-500",
                              "transition-opacity",
                              "data-[hover=true]:text-foreground",
                              "data-[pressed=true]:opacity-70",
                              "data-[hover=true]:bg-default-200",
                              "data-[selectable=true]:focus:bg-default-100",
                              "data-[focus-visible=true]:ring-default-500",
                            ],
                          },
                        }}
                      >
                        {(item) => (
                          <AutocompleteItem key={item.Name}>
                            {item.Name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  />

                  <div className="flex justify-between gap-x-4">
                    {/* Select district */}
                    <Controller
                      name="district"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Autocomplete
                          {...field}
                          defaultItems={districts}
                          onSelectionChange={(e) => {
                            field.onChange(e);
                          }}
                          selectedKey={field.value}
                          isDisabled={isPending}
                          label="District"
                          labelPlacement="outside"
                          variant="bordered"
                          size="md"
                          placeholder="Choose a district"
                          startContent={
                            <GiStreetLight className="text-xl font-thin" />
                          }
                          errorMessage={fieldState.error?.message}
                          isInvalid={!!fieldState.error}
                          isRequired
                          listboxProps={{
                            itemClasses: {
                              base: [
                                "rounded-medium",
                                "text-default-500",
                                "transition-opacity",
                                "data-[hover=true]:text-foreground",
                                "data-[pressed=true]:opacity-70",
                                "data-[hover=true]:bg-default-200",
                                "data-[selectable=true]:focus:bg-default-100",
                                "data-[focus-visible=true]:ring-default-500",
                              ],
                            },
                          }}
                        >
                          {districts.length > 0 ? (
                            (item) => (
                              <AutocompleteItem key={item.Name}>
                                {item.Name}
                              </AutocompleteItem>
                            )
                          ) : (
                            <AutocompleteItem key={"Empty"}>
                              <span>Please choose a city first</span>
                            </AutocompleteItem>
                          )}
                        </Autocomplete>
                      )}
                    />

                    {/* Select a ward */}
                    <Controller
                      name="ward"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Autocomplete
                          {...field}
                          defaultItems={wards}
                          onSelectionChange={(e) => {
                            field.onChange(e);
                          }}
                          selectedKey={field.value}
                          isDisabled={isPending}
                          label="Ward"
                          labelPlacement="outside"
                          variant="bordered"
                          size="md"
                          placeholder="Choose a ward"
                          startContent={
                            <FaStreetView className="text-xl font-thin" />
                          }
                          errorMessage={fieldState.error?.message}
                          isInvalid={!!fieldState.error}
                          isRequired
                          listboxProps={{
                            itemClasses: {
                              base: [
                                "rounded-medium",
                                "text-default-500",
                                "transition-opacity",
                                "data-[hover=true]:text-foreground",
                                "data-[pressed=true]:opacity-70",
                                "data-[hover=true]:bg-default-200",
                                "data-[selectable=true]:focus:bg-default-100",
                                "data-[focus-visible=true]:ring-default-500",
                              ],
                            },
                          }}
                        >
                          {wards.length > 0 ? (
                            (item) => (
                              <AutocompleteItem key={item.Name}>
                                {item.Name}
                              </AutocompleteItem>
                            )
                          ) : (
                            <AutocompleteItem key={"Empty"}>
                              <span>Please choose a city/district first</span>
                            </AutocompleteItem>
                          )}
                        </Autocomplete>
                      )}
                    />
                  </div>

                  {/* Address Line */}
                  <Controller
                    name="addressLine"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        onValueChange={(e) => field.onChange(e)}
                        isDisabled={isPending}
                        label="Address Line"
                        labelPlacement="outside"
                        variant="bordered"
                        size="md"
                        placeholder="Enter your address line"
                        startContent={<Home className="h-4 w-4" />}
                        errorMessage={fieldState.error?.message}
                        isInvalid={!!fieldState.error}
                        isRequired
                        isClearable
                        className="pt-6"
                      />
                    )}
                  />
                </div>
              </Tab>
              {/* Education */}
              <Tab
                key="education"
                title={
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Education</span>
                  </div>
                }
                className="w-full"
              >
                <div className="space-y-6">
                  {/* School Name */}
                  <Controller
                    name="schoolName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Autocomplete
                        {...field}
                        defaultItems={schools}
                        onSelectionChange={(e) => {
                          if (e === null) {
                            field.onChange(undefined);
                            return;
                          }
                          field.onChange(e);
                        }}
                        selectedKey={field.value}
                        isDisabled={isPending}
                        label="School"
                        labelPlacement="outside"
                        variant="bordered"
                        size="md"
                        placeholder="Choose a school"
                        startContent={
                          field.value && (
                            <Image
                              width={30}
                              src={
                                schools?.find(
                                  (school) => school.name === field.value,
                                )?.logoUrl
                              }
                              alt="Logo"
                            />
                          )
                        }
                        errorMessage={fieldState.error?.message}
                        isInvalid={fieldState.invalid}
                        listboxProps={{
                          itemClasses: {
                            base: [
                              "rounded-medium",
                              "text-default-500",
                              "transition-opacity",
                              "data-[hover=true]:text-foreground",
                              "data-[pressed=true]:opacity-70",
                              "data-[hover=true]:bg-default-200",
                              "data-[selectable=true]:focus:bg-default-100",
                              "data-[focus-visible=true]:ring-default-500",
                            ],
                          },
                        }}
                      >
                        {(item) => (
                          <AutocompleteItem
                            key={item.name}
                            startContent={
                              <Image
                                width={30}
                                src={
                                  schools?.find(
                                    (school) => school.name === item.name,
                                  )?.logoUrl
                                }
                                alt="Logo"
                              />
                            }
                          >
                            {item.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  />

                  {getValues("schoolName") && (
                    <>
                      {/* Program Name */}
                      <Controller
                        name="programName"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Autocomplete
                            {...field}
                            defaultItems={programs ? programs : []}
                            onSelectionChange={(e) => {
                              if (e === null) {
                                field.onChange(undefined);
                                return;
                              }
                              field.onChange(e);
                            }}
                            selectedKey={field.value}
                            isDisabled={isPending}
                            label="Program"
                            labelPlacement="outside"
                            variant="bordered"
                            size="md"
                            placeholder="Choose a program"
                            errorMessage={fieldState.error?.message}
                            isInvalid={fieldState.invalid}
                            listboxProps={{
                              itemClasses: {
                                base: [
                                  "rounded-medium",
                                  "text-default-500",
                                  "transition-opacity",
                                  "data-[hover=true]:text-foreground",
                                  "data-[pressed=true]:opacity-70",
                                  "data-[hover=true]:bg-default-200",
                                  "data-[selectable=true]:focus:bg-default-100",
                                  "data-[focus-visible=true]:ring-default-500",
                                ],
                              },
                            }}
                          >
                            {(item) => (
                              <AutocompleteItem key={item.name}>
                                {item.name}
                              </AutocompleteItem>
                            )}
                          </Autocomplete>
                        )}
                      />
                      {/* degreeName */}
                      <Controller
                        name="degreeType"
                        control={control}
                        render={({ field, fieldState }) => (
                          <div className="pt-0.5">
                            <Select
                              {...field}
                              selectionMode="single"
                              onSelectionChange={(e) => {
                                field.onChange(e);
                              }}
                              selectedKeys={field.value && [field.value]}
                              isDisabled={isPending}
                              label="Degree"
                              labelPlacement="outside"
                              variant="bordered"
                              size="md"
                              placeholder="Choose a degree"
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              classNames={{
                                value: "text-prismary",
                              }}
                              listboxProps={{
                                itemClasses: {
                                  base: [
                                    "rounded-medium",
                                    "text-default-500",
                                    "transition-opacity",
                                    "data-[hover=true]:text-foreground",
                                    "data-[pressed=true]:opacity-70",
                                    "data-[hover=true]:bg-default-200",
                                    "data-[selectable=true]:focus:bg-default-100",
                                    "data-[focus-visible=true]:ring-default-500",
                                  ],
                                },
                              }}
                            >
                              <SelectItem
                                key={DegreeType.HIGHSCHOOL}
                                value={DegreeType.HIGHSCHOOL}
                              >
                                Highschool
                              </SelectItem>
                              <SelectItem
                                key={DegreeType.UNIVERSITY}
                                value={DegreeType.UNIVERSITY}
                              >
                                University
                              </SelectItem>
                            </Select>
                          </div>
                        )}
                      />

                      <div className="flex items-end gap-x-4">
                        {/* Language Type */}
                        <Controller
                          name="certificateType"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Select
                              {...field}
                              onSelectionChange={(e) => {
                                field.onChange(e);
                                setValue("certificateImg", "");
                              }}
                              selectedKeys={field.value && [field.value]}
                              isDisabled={isPending}
                              label="Language Certificate"
                              labelPlacement="outside"
                              variant="bordered"
                              size="md"
                              placeholder="Choose a certificate"
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              classNames={{
                                value: "text-primary",
                              }}
                              listboxProps={{
                                itemClasses: {
                                  base: [
                                    "rounded-medium",
                                    "text-default-500",
                                    "transition-opacity",
                                    "data-[hover=true]:text-foreground",
                                    "data-[pressed=true]:opacity-70",
                                    "data-[hover=true]:bg-default-200",
                                    "data-[selectable=true]:focus:bg-default-100",
                                    "data-[focus-visible=true]:ring-default-500",
                                  ],
                                },
                              }}
                            >
                              <SelectItem
                                key={CertificateType.IELTS}
                                value={CertificateType.IELTS}
                              >
                                {CertificateType.IELTS}
                              </SelectItem>
                              <SelectItem
                                key={CertificateType.TOEFL}
                                value={CertificateType.TOEFL}
                              >
                                TOEFL
                              </SelectItem>
                            </Select>
                          )}
                        />
                        {/* Language Image URL */}
                        {getValues("certificateType") != null &&
                          (getValues("certificateImg") != "" ? (
                            <Controller
                              name="certificateImg"
                              control={control}
                              render={({ field, fieldState }) => (
                                <HoverCard>
                                  <HoverCardTrigger>
                                    <Input
                                      {...field}
                                      onValueChange={field.onChange}
                                      value="Hover to see detail"
                                      readOnly={true}
                                      label="Image Url"
                                      labelPlacement="outside"
                                      size="md"
                                      variant="faded"
                                      errorMessage={fieldState.error?.message}
                                      isInvalid={fieldState.invalid}
                                      classNames={{
                                        input: "cursor-default",
                                      }}
                                      isClearable
                                    />
                                  </HoverCardTrigger>
                                  <HoverCardContent
                                    align="center"
                                    alignOffset={10}
                                    className="flex w-80 items-center justify-center rounded-md"
                                  >
                                    <Image
                                      width={300}
                                      src={field.value}
                                      alt="certificate-image"
                                      isZoomed
                                      isBlurred
                                      shadow="md"
                                    />
                                  </HoverCardContent>
                                </HoverCard>
                              )}
                            />
                          ) : (
                            <>
                              <Button
                                onClick={() => setOpen((v) => !v)}
                                isDisabled={isPending}
                                variant="bordered"
                                startContent={<File className="h-4 w-4" />}
                                size="md"
                                className="w-full p-4"
                              >
                                Upload file here
                              </Button>
                              <CertificateImageModal
                                onUpload={onUpload}
                                isOpen={open}
                                isUploading={isUploading}
                              />
                            </>
                          ))}
                      </div>
                      <div className="flex items-center gap-x-4">
                        {/* Overall Score */}
                        <Controller
                          name="gradeType"
                          control={control}
                          render={({ field, fieldState }) => (
                            <RadioGroup
                              {...field}
                              onValueChange={(e) => field.onChange(e)}
                              orientation="horizontal"
                              isDisabled={isPending}
                              label="Overall Score"
                              size="md"
                              defaultValue={field.value}
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              classNames={{
                                label: "text-sm text-primary",
                              }}
                            >
                              <Radio value={GradeType.GPA}>GPA (?/4.0)</Radio>
                              <Radio value={GradeType.CGPA}>
                                CGPA (?/10.0)
                              </Radio>
                            </RadioGroup>
                          )}
                        />

                        {/* Grade Score */}
                        <Controller
                          name="gradeScore"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Input
                              {...field}
                              isDisabled={isPending}
                              defaultValue={"1"}
                              type="number"
                              min={0}
                              max={
                                getValues("gradeType") === GradeType.GPA
                                  ? 4
                                  : 10
                              }
                              step={0.1}
                              label=""
                              labelPlacement="outside"
                              variant="bordered"
                              size="md"
                              errorMessage={fieldState.error?.message}
                              isInvalid={!!fieldState.error}
                              className="w-full max-w-[150px] pt-6"
                            />
                          )}
                        />
                      </div>
                    </>
                  )}
                </div>
              </Tab>
            </Tabs>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              isLoading={isPending}
              isDisabled={isPending || !isValid}
              type="submit"
              className="mt-4 w-full bg-[#7D1F1F] font-semibold text-white"
            >
              Sign Up
            </Button>
          </div>
        </form>
      )}
    </CardWrapper>
  );
};
