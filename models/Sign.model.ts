import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default class SignModel {
  #id: number;
  #title: string;
  #profile: string;
  #image: string | StaticImport;
  #initalDate: number;
  #finalDate: number;

  constructor(
    id: number,
    title: string,
    profile: string,
    image: string,
    initialDate: number,
    finalDate: number
  ) {
    this.#id = id;
    this.#title = title;
    this.#profile = profile;
    this.#image = image;
    this.#initalDate = initialDate;
    this.#finalDate = finalDate;
  }

  get id(): number {
    return this.#id;
  }

  get title(): string {
    return this.#title;
  }

  get profile(): string {
    return this.#profile;
  }

  get image(): string | StaticImport {
    return this.#image;
  }

  get initialDate(): number {
    return this.#initalDate;
  }

  get finalDate(): number {
    return this.#finalDate;
  }

  objectParse() {
    return {
      title: this.title,
      profile: this.profile,
      image: this.image,
    };
  }
}
