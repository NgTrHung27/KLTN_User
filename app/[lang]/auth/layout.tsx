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
    <>
      <div className="absolute flex w-full items-center justify-between">
        <Image
          width={85}
          src="/logo-red.png"
          alt="logo"
          className="m-4 flex-1"
        />
        <div className="mx-4 flex items-center gap-x-2">
          <LanguageToggle />
          <ModeToggle dict={dict} className=" text-black dark:text-white" />
        </div>
      </div>
      <div className="flex h-full items-center justify-center bg-background">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
