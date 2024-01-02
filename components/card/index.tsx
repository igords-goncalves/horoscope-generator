import parseDate from "@/util/parseDate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HoroscopeGenService from "@/services/HoroscopeGen.service";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Sign = {
  image: string | StaticImport;
  title: string;
  profile: string;
};

export default function Card() {
  const [date, setDate] = useState<number>();
  const [sign, setSign] = useState<Sign>();

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
    const response = await horoscopeGenService.get(`/api/sign/${date}`);
    const data = await response.data;
    setSign(data);
  }

  return (
    <div className="card flex flex-col items-center bg-card h-screen w-full max-w-[470px] max-h-[544px] rounded-3xl px-16 py-12 gap-6">
      <div className="image flex items-center justify-center w-full max-w-[150px] max-h-[150px] h-full">
        <Image
        // TODO: Add a default image here
          src={`${sign ? sign?.image : ""}`} 
          alt="Aquarius Sign"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
      <div className="title flex flex-col items-center gap-6 text-dark">
        <h1 className="font-[700] text-[2rem]">
          {sign ? sign?.title : "Sign"}
        </h1>
        <p className="text-base">
          {sign ? sign?.profile : "Short profile sign description"}
        </p>
      </div>

      <form onSubmit={handleSubmit(submitDate)} className="flex flex-col gap-6">
        {/*TODO: UI COMPONENTS */}
        <input type="date" {...register("bday")} />
        <button className="bg-primary text-light" type="submit">
          Generate
        </button>
      </form>
    </div>
  );
}
