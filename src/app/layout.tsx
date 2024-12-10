import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Modals } from "@/components/modals";
import { Toaster } from "@/components/ui/sonner";
import { JaotaiProvider } from "@/components/jotai-provider";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TeamFuse",
  description: "Made with ❤️ by Krishan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConvexClientProvider>
            <JaotaiProvider>
              <NuqsAdapter>
                <Toaster />
                <Modals />
                {children}
              </NuqsAdapter>
            </JaotaiProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
