import Image from "next/image";
import vercel from "../public/vercel.svg";
import { useIsLoadingData } from "@/hooks/useIsLoadingData";
import { Spinner } from "@nextui-org/react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type ToggleImageProps = {
  date?: number;
  image?: string | StaticImport;
};

const ToggleImage = ({ date, image }: ToggleImageProps) => {
  const { isLoading } = useIsLoadingData();

  function ImageSign() {
    return isLoading ? (
      <Spinner size="lg" label="Loading sign" color="secondary" />
    ) : (
      <Image
        src={image!}
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
      {date && image ? <ImageSign /> : <Image src={vercel} alt="Vercel logo" />}
    </div>
  );
};

export default ToggleImage;
