import parseDate from "@/util/parseDate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HoroscopeGenService from "@/services/HoroscopeGen.service";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Button, Spinner } from "@nextui-org/react";
import vercel from "../../public/next.svg";

type Sign = {
  image: string | StaticImport;
  title: string;
  profile: string;
};

export default function Card() {
  const [date, setDate] = useState<number>();
  const [sign, setSign] = useState<Sign>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const horoscopeGenService = new HoroscopeGenService();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const bday = watch("bday");

  useEffect(() => {
    parseDate({ bday, setDate });
  }, [bday]);

  async function submitDate() {
    try {
      setIsLoading(true); // Set isLoading to true before making the API call
      setIsDisabled(true);
      const response = await horoscopeGenService.get(`/api/sign/${date}`);
      const data = await response.data;
      setSign(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisabled(false);
      setIsLoading(false); // Set isLoading to false after receiving the response
    }
  }

  function renderImage() {
    return isLoading ? (
      <Spinner size="lg" label="Loading sign" color="secondary" />
    ) : (
      <Image
        // TODO: Add a default image here
        src={`${sign ? sign?.image : ""}`}
        alt="Aquarius Sign"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "auto", height: "auto" }}
      />
    );
  }

  return (
    <div className="mr-5 ml-5 card flex flex-col items-center bg-card h-screen w-full max-w-[470px] max-h-[544px] rounded-3xl px-5 sm:px-16 pt-8 gap-4">
      <div className="image flex items-center justify-center w-full max-w-[150px] max-h-[150px] h-full">
        {date ? renderImage() : <Image src={vercel} alt="Vercel"></Image>}
      </div>
      <div className="title flex w-full flex-col text-center items-center gap-6 text-dark">
        <h1 className="font-[700] text-[2rem]">
          {sign ? sign?.title : "Sign"}
        </h1>
        <p className="text-base h-[56px]">
          {sign ? sign?.profile : "Short profile sign description"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submitDate)}
        className="flex flex-col gap-6 w-full"
      >
        {/*TODO: NextUI COMPONENTS */}
        <div className="flex flex-col items-start w-full">
          <label className="text-slate-400 text-xs pb-1 ml-2">Birthday</label>
          <input
            type="date"
            className="border-1 h-[56px] px-4 rounded-2xl text-dark w-full"
            {...register("bday", { required: true })}
          />
        </div>
        <Button
          isDisabled={isDisabled}
          type="submit"
          className="bg-primary w-full text-light h-[56px] text-2xl "
        >
          Generate
        </Button>
      </form>
    </div>
  );
}
