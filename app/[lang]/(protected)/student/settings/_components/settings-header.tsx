"use client";

import { SettingsAction } from "./settings-action";

interface SettingsHeaderProps {
  title: string;
  description: string;
  showActions?: boolean;
  isEdit?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  setIsEditting?: () => void;
}

export const SettingsHeader = ({
  title,
  description,
  showActions,
  isEdit,
  onConfirm,
  onCancel,
  setIsEditting,
}: SettingsHeaderProps) => {
  return (
    <div className="h-full w-full">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#7F1D1D] dark:text-primary">
          {title}
        </h3>
        {showActions && (
          <SettingsAction
            isEdit={isEdit}
            setIsEditting={setIsEditting}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        )}
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
