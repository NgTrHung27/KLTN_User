import { LoginForm } from "@/components/auth/login-form";
import { Image } from "@nextui-org/react";

const LoginPage = () => {
  return (
    <>
      <div className="flex h-full items-center justify-around gap-x-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-black p-4">
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
