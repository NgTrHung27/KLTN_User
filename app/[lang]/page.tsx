import { Button, Link, cn } from "@nextui-org/react";
import { getDictionary } from "@/data/dictionaries";
import { Metadata } from "next";

export const metadata: Metadata = {};

export default async function Home({
  params: { lang },
}: {
  params: { lang: "en" | "vi" };
}) {
  const dict = await getDictionary(lang);
  metadata.title = dict.Home.Title;
  return (
    <main className="flex h-full items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="text-4xl font-semibold text-amber-500 drop-shadow-md">
          🏫{dict.Home.Title}
        </h1>
        <Button>
          <Link href="/auth/login">{dict.Authentication.Login_Button}</Link>
        </Button>
        <Button color="warning">
          <Link href="/auth/register">
            {dict.Authentication.Register_Button}
          </Link>
        </Button>
      </div>
    </main>
  );
}
