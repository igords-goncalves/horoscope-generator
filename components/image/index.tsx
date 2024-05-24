import { Sign } from "@/types/Sign";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";

type ImageSign = {
  isLoading: boolean | undefined,
  sign: Sign | undefined,
}

//TODO: Refatorar
export default function ImageSign({isLoading, sign}: ImageSign) {
  const image = sign?.image

  return isLoading ? (
    <Spinner size="lg" label="Loading sign" color="secondary" />
  ) : (
    <Image
      src={`${image || ""}`}
      alt="Sign Image"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "auto", height: "auto" }}
      priority
    />
  );
};
