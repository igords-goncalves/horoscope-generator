import { Spinner } from "@nextui-org/react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type Sign = {
  image: string | StaticImport;
  title: string;
  profile: string;
};

type ImageSign = {
  isLoading: boolean | undefined,
  sign: Sign | undefined,
}

export default function ImageSign({isLoading, sign}: ImageSign) {
  return isLoading ? (
    <Spinner size="lg" label="Loading sign" color="secondary" />
  ) : (
    <Image
      src={`${sign ? sign?.image : ""}`}
      alt="Aquarius Sign"
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "auto", height: "auto" }}
    />
  );
};
