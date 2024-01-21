"use client";

import { RegisterForm } from "@/components/auth/register-form";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <div className="relative h-full w-full">
      <Image
        fill
        src={"/register.jpg"}
        alt="register"
        className="absolute object-fill blur"
      />
      <div className="relative z-50 flex h-full items-center justify-evenly gap-x-4 p-4">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
