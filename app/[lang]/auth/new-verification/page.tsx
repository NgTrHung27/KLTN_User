import { NewVerificationForm } from "@/components/auth/new-verification-form";
import Image from "next/image";
import { metadata } from "../../layout";

const NewVerificationPage = () => {
  metadata.title = "Email Verification";
  return (
    <div className="relative h-full w-full">
      <Image
        fill
        src={"/login.jpg"}
        alt="newVerification"
        className="absolute object-fill blur"
      />
      <div className="relative z-50 flex h-full items-center justify-evenly gap-x-4 p-4">
        <NewVerificationForm />
      </div>
    </div>
  );
};

export default NewVerificationPage;
