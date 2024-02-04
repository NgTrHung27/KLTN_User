"use client";

import { Divider } from "@nextui-org/react";
import { SettingsHeader } from "../../_components/settings-header";

export const NotificationsForm = () => {
  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Notifications"
        description="Configure how you receive notifications on your profile."
        showActions
      />
      <Divider />
    </div>
  );
};
