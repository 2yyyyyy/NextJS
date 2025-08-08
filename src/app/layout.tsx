import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Header } from "@/app/_navigation/header";
import { Sidebar } from "@/app/_navigation/sidebar/component/sidebar";
import { ReactQueryProvider } from "@/app/_provider/react-query/react-query-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Road to Next",
  description: "My first Next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ReactQueryProvider>
            <Header />
            <div className="flex h-screen overflow-hidden border-collapse">
              <Sidebar />
              <main
                className="
                min-h-screen flex-1
                overflow-y-auto overflow-x-hidden
                py-24 px-8
                bg-secondary/20
                flex flex-col
              "
              >
                <NuqsAdapter>{children}</NuqsAdapter>
              </main>
            </div>

            <Toaster
              expand
              toastOptions={{
                className: "!text-lg !w-100 !h-16",
              }}
            />
          </ReactQueryProvider>
          {/* <RedirectToast /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
