import Card from "@/components/Card";
import IsLoadingProvider from "@/context/IsLoadingProvider";

import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const Home = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <main
      data-testid="main-testid"
      className={`flex bg-hero min-h-screen w-full items-center justify-center ${inter.className}`}
    >
      <IsLoadingProvider data={{isLoading, setIsLoading}}>
        <Card />
      </IsLoadingProvider>
    </main>
  );
}

export default Home;