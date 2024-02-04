"use client";

import { Divider, Radio, RadioGroup } from "@nextui-org/react";
import { SettingsHeader } from "../../_components/settings-header";
import { LightThemeCard } from "@/components/light-theme-card";
import { DarkThemeCard } from "@/components/dark-theme-card";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const AppearanceForm = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      <SettingsHeader
        title="Appearance"
        description="Customize the appearance of the web. Automatically switch between themes."
      />
      <Divider />
      <div className="flex flex-col">
        <h2 className="text-sm text-primary">Theme</h2>
        <p className="text-xs text-foreground-400">
          Select the main theme for the app
        </p>
        <div className="my-2 flex items-center gap-x-4">
          <RadioGroup
            orientation="horizontal"
            label="Select your main theme for the app"
            size="md"
            defaultValue={theme}
            onValueChange={setTheme}
          >
            <Radio value="light">
              <div className="flex flex-col items-center justify-center gap-y-2">
                <LightThemeCard />
                Light
              </div>
            </Radio>
            <Radio value="dark">
              <div className="flex flex-col items-center justify-center gap-y-2">
                <DarkThemeCard />
                Dark
              </div>
            </Radio>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
