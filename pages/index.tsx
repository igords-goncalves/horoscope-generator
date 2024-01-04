import Card from "@/components/card";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
      <main
        data-testid="main-testid"
        className={`flex bg-hero min-h-screen w-full items-center justify-center ${inter.className}`}
      >
        <Card />
      </main>
  );
}
