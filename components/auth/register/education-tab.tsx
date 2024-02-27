"use client";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { SchoolInput } from "./school-input";
import { ProgramInput } from "./program-input";
import { DegreeInput } from "./degree-input";
import { LanguageInput } from "./language-input";
import { ImageInput } from "./image-input";
import { ImageDropInput } from "./image-drop-input";
import { ScoreInput } from "./score-input";
import { NumberInput } from "./number-input";
import { SchoolLib } from "@/types";
import { CertificateType, GradeType } from "@prisma/client";

interface EducationTabProps {
  control: any;
  isLoading: boolean;
  schoolName: string;
  programs: { name: string }[];
  schools: SchoolLib[];
  ctfType: CertificateType;
  ctfImg: string;
  onFileChange: (url: string) => void;
  gradeType: GradeType;
}

export const EducationTab = ({
  control,
  isLoading,
  schoolName,
  schools,
  programs,
  ctfImg,
  ctfType,
  onFileChange,
  gradeType,
}: EducationTabProps) => {
  return (
    <div className="flex flex-col gap-y-6">
      {/* School Name */}
      <FormField
        name="schoolName"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              <SchoolInput
                field={field}
                isInvalid={fieldState.invalid}
                isLoading={isLoading}
                onSelectionChange={field.onChange}
                schools={schools}
                value={field.value}
                errorMessage={fieldState.error?.message}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {schoolName && (
        <>
          {/* Program Name */}
          <FormField
            name="programName"
            control={control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <ProgramInput
                    field={field}
                    isInvalid={fieldState.invalid}
                    isLoading={isLoading}
                    onSelectionChange={field.onChange}
                    programs={programs}
                    value={field.value}
                    errorMessage={fieldState.error?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* degreeName */}
          <FormField
            name="degreeType"
            control={control}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <DegreeInput
                    field={field}
                    isInvalid={fieldState.invalid}
                    isLoading={isLoading}
                    onSelectionChange={field.onChange}
                    errorMessage={fieldState.error?.message}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Language Type */}
            <FormField
              name="certificateType"
              control={control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <LanguageInput
                      field={field}
                      isInvalid={fieldState.invalid}
                      isLoading={isLoading}
                      onSelectionChange={field.onChange}
                      errorMessage={fieldState.error?.message}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Language Image URL */}
            {ctfType != null &&
              (ctfImg != null ? (
                <FormField
                  name="certificateImg"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ImageInput
                          field={field}
                          onValueChange={() => field.onChange(undefined)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : (
                <>
                  <FormField
                    name="certificateImg"
                    control={control}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl>
                          <ImageDropInput
                            onFileChange={onFileChange}
                            field={field}
                            errorMessage={fieldState.error?.message}
                            isInvalid={fieldState.invalid}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              ))}
          </div>
          <div className="flex items-center justify-between gap-x-4">
            {/* Overall Score */}
            <FormField
              name="gradeType"
              control={control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <ScoreInput
                      field={field}
                      isInvalid={fieldState.invalid}
                      isLoading={isLoading}
                      onValueChange={field.onChange}
                      errorMessage={fieldState.error?.message}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Grade Score */}
            <FormField
              name="gradeScore"
              control={control}
              render={({ field, fieldState }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <NumberInput
                      field={field}
                      isInvalid={fieldState.invalid}
                      isLoading={isLoading}
                      onValueChange={field.onChange}
                      type={gradeType}
                      errorMessage={fieldState.error?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};
