import { LoginForm } from "@/components/auth/login-form";
import { Image } from "@nextui-org/react";

const LoginPage = () => {
  return (
    <>
      <Image
        width={50}
        src="/logo-red.png"
        alt="logo"
        className="absolute m-4"
      />
      <div className="flex h-full items-center justify-around gap-x-4 p-4">
        <LoginForm />
        <Image
          width={300}
          alt="Login"
          src="/login.png"
          className="object-cover"
        />
      </div>
    </>
  );
};

export default LoginPage;
