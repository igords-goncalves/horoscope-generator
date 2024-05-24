import Image from "next/image";
import ImageSign from "./image";
import SignModel from "@/models/Sign.model";
import vercel from "../public/vercel.svg";
import { useIsLoadingData } from "@/hooks/useIsLoadingData";

type ToggleImageProps = {
  date?: number;
  sign?: SignModel;
};

const ToggleImage = ({date, sign}: ToggleImageProps) => {
  const {isLoading } = useIsLoadingData();

  return (
    <div className="image flex items-center justify-center w-full max-w-[150px] max-h-[150px] h-full">
      {date && sign ? (
        <ImageSign sign={sign} isLoading={isLoading} />
      ) : (
        <Image src={vercel} alt="Vercel logo" />
      )}
    </div>
  );
};

export default ToggleImage;
