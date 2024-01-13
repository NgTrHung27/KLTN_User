import Image from "next/image";
import { Poppins } from "next/font/google";
import { Button, Link, cn } from "@nextui-org/react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1
          className={cn(
            "text-4xl font-semibold text-amber-500 drop-shadow-md",
            font.className,
          )}
        >
          🏫Quản lý du học sinh Canada
        </h1>
        <Button>
          <Link href="/auth/login">Đăng nhập</Link>
        </Button>
        <Button color="warning">Đăng ký</Button>
      </div>
    </main>
  );
}
