import { NewPasswordForm } from "@/components/auth/new-password-form";
import Image from "next/image";
import { metadata } from "../../layout";

const NewPasswordPage = () => {
  metadata.title = "Enter your new password";
  return (
    <div className="relative h-full w-full">
      <Image
        fill
        src={"/login.jpg"}
        alt="newPassword"
        className="absolute object-fill blur"
      />
      <div className="relative z-50 flex h-full items-center justify-evenly gap-x-4 p-4">
        <NewPasswordForm />
      </div>
    </div>
  );
};

export default NewPasswordPage;
