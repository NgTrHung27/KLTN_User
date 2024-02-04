import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "react-day-picker/dist/style.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Providers } from "@/components/providers/providers";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang={params.lang} suppressHydrationWarning>
        <body className={montserrat.className}>
          <EdgeStoreProvider>
            <ThemeProvider
              storageKey="theme"
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
              <ModalProvider />
              <Providers>
                <main className="h-full w-full bg-white dark:bg-background">
                  {children}
                </main>
              </Providers>
            </ThemeProvider>
          </EdgeStoreProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
