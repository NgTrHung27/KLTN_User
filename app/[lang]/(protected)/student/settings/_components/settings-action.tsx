"use client";

import { Button } from "@nextui-org/react";

interface SettingsActionProps {
  isEdit?: boolean;
  setIsEditting?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const SettingsAction = ({
  isEdit,
  setIsEditting,
  onConfirm,
  onCancel,
}: SettingsActionProps) => {
  return !isEdit ? (
    <Button
      onClick={setIsEditting}
      size="md"
      color="primary"
      className="border-[#7D1F1F] text-base text-[#7D1F1F] hover:!bg-[#7D1f1F] dark:border-primary dark:text-primary dark:hover:!bg-primary"
      variant="ghost"
    >
      Edit
    </Button>
  ) : (
    <div className="flex items-center justify-center gap-x-2">
      <Button
        onClick={onCancel}
        size="md"
        color="primary"
        className="border-[#7D1F1F] text-base text-[#7D1F1F] hover:!bg-[#7D1f1F] dark:border-primary dark:text-primary dark:hover:!bg-primary"
        variant="ghost"
      >
        Cancel
      </Button>
      <Button
        onClick={onConfirm}
        size="md"
        color="primary"
        className="bg-[#7D1F1F] text-base dark:bg-primary"
        variant="solid"
      >
        Save changes
      </Button>
    </div>
  );
};
