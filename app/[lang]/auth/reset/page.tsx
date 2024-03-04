import { ResetForm } from "@/components/auth/reset-form";
import Image from "next/image";
import { metadata } from "../../layout";

const ResetPage = () => {
  metadata.title = "Reset password";
  return (
    <div className="relative h-full w-full">
      <Image
        fill
        src={"/login.jpg"}
        alt="resetPassword"
        className="absolute object-fill blur"
        quality={100}
        priority
      />
      <div className="relative z-50 flex h-full items-center justify-evenly gap-x-4 p-4">
        <ResetForm />
      </div>
    </div>
  );
};

export default ResetPage;
