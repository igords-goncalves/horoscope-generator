import Image from "next/image";
import SignModel from "@/models/Sign.model";
import vercel from "../public/vercel.svg";
import { useIsLoadingData } from "@/hooks/useIsLoadingData";
import { Spinner } from "@nextui-org/react";

type ToggleImageProps = {
  date?: number;
  sign?: SignModel;
};

const ToggleImage = ({ date, sign }: ToggleImageProps) => {
  const { isLoading } = useIsLoadingData();

  function ImageSign() {
    return isLoading ? (
      <Spinner size="lg" label="Loading sign" color="secondary" />
    ) : (
      <Image
        src={sign?.image as string}
        alt="Sign Image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "auto", height: "auto" }}
        priority
      />
    );
  }

  return (
    <div className="image flex items-center justify-center w-full max-w-[150px] max-h-[150px] h-full">
      {date && sign ? <ImageSign /> : <Image src={vercel} alt="Vercel logo" />}
    </div>
  );
};

export default ToggleImage;
