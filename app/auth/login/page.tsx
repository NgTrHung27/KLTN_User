import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="relative h-full w-full">
      <Image
        fill
        src={"/login.jpg"}
        alt="register"
        className="absolute object-fill blur"
      />
      <div className="relative z-50 flex h-full items-center justify-evenly gap-x-4 p-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
