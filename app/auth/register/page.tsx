import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { Image } from "@nextui-org/react";

const RegisterPage = () => {
  return (
    <>
      <Image
        width={50}
        src="/logo-red.png"
        alt="logo"
        className="absolute m-4"
      />
      <div className="flex h-full items-center justify-around gap-x-4 p-4">
        <Image width={300} alt="Login" src="/register.png" />
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
