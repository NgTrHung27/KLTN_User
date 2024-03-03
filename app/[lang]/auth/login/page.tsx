import { LoginForm } from "@/components/auth/login-form";
import { getDictionary } from "@/data/dictionaries";
import Image from "next/image";
import { metadata } from "../../layout";

const LoginPage = async ({
  params: { lang },
}: {
  params: { lang: "en" | "vi" };
}) => {
  metadata.title = "Login";
  const dict = await getDictionary(lang);
  return (
    <div className="relative h-full w-full scrollbar-hide">
      <Image
        fill
        src={"/login.jpg"}
        alt="register"
        className="absolute object-cover blur"
        priority
        quality={100}
      />
      <div className="relative z-50 flex h-full items-center justify-evenly gap-x-4 p-4">
        <LoginForm dict={dict} />
      </div>
    </div>
  );
};

export default LoginPage;
