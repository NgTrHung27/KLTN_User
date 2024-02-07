"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Divider } from "@nextui-org/react";
import { SettingsSidebar } from "./_components/settings-sidebar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser();
  const router = useRouter();

  if (!user) {
    return router.push("/");
  }

  return (
    <div className="hidden w-full space-y-6 bg-white p-10 dark:bg-background md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight text-[#7D1f1f] dark:text-primary">
          Settings
        </h2>
        <p className=" text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Divider />
      <div className="flex w-full flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <ResizablePanelGroup
          direction="horizontal"
          className="hidden h-full w-full rounded-lg border md:block"
        >
          <ResizablePanel minSize={25} defaultSize={30} maxSize={30}>
            <div className="flex h-full items-center justify-center p-6">
              <SettingsSidebar />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            <div className="h-full p-6">{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default SettingsLayout;
