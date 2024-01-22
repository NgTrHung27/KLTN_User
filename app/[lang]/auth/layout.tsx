import { LanguageToggle } from "@/components/language-switcher";
import { ModeToggle } from "@/components/theme-switcher";
import { Lang, getDictionary } from "@/data/dictionaries";
import { Image } from "@nextui-org/react";

const AuthLayout = async ({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Lang };
}) => {
  const dict = await getDictionary(lang);
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-background">
      <Image
        width={85}
        src="/logo-red.png"
        alt="logo"
        className="absolute m-4"
      />
      {children}
      <div className="absolute right-0 top-0 z-[99999] m-4 flex items-center gap-x-4">
        <LanguageToggle />
        <ModeToggle dict={dict} className=" text-black dark:text-white" />
      </div>
    </div>
  );
};

export default AuthLayout;
