import { ModeToggle } from "@/components/theme-switcher";
import { Image } from "@nextui-org/react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full bg-white">
      <Image
        width={85}
        src="/logo-red.png"
        alt="logo"
        className="absolute m-4"
      />
      {children}
      <ModeToggle className="absolute right-0 top-0 z-[99999] m-4 text-black dark:text-white" />
    </div>
  );
};

export default AuthLayout;
