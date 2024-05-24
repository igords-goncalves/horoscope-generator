import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Sign = {
  image: string | StaticImport;
  title: string;
  profile: string;
};
