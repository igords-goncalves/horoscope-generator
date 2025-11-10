import parseDate from "@/util/parseDate";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HoroscopeGenService from "@/services/HoroscopeGen.service";
import { Button } from "@nextui-org/react";
import SignModel from "@/models/Sign.model";
import { useIsLoadingData } from "@/hooks/useIsLoadingData";
import Form from "./common/Form";
import Input from "./common/Input";
import ToggleTitle from "./ToggleTitle";
import ToggleImage from "./ToggleImage";
import AnalyticsService from "@/services/Analytics.service";

const Card = (): JSX.Element => {
  const [date, setDate] = useState<number>();
  const [sign, setSign] = useState<SignModel>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { isLoading, setIsLoading } = useIsLoadingData();

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

  async function fetchData() {
    try {
      setIsLoading(true); // Set isLoading to true before making the API call
      setIsDisabled(true);
      const response = await horoscopeGenService.get(`/api/sign/${date}`);
      const data = await response.data;
      setSign(data);
    } catch (error: unknown) {
      console.error(error);
      throw new Error(error?.toString());
    } finally {
      setIsDisabled(false);
      setIsLoading(false); // Set isLoading to false after receiving the response
    }
  }

  const amplitude = AnalyticsService.getInstance();

  const handleAmplitudeTracking = () => {
    amplitude.trackEvent("Button Generate Clicked", { date: date || null, sign: sign?.title || null });
  }

  return (
    <section
      data-testid="card-testid"
      className="mr-5 ml-5 card flex flex-col items-center bg-card h-screen pb-10 w-full max-w-[470px] max-h-[544px] rounded-3xl px-5 sm:px-16 pt-8 gap-4"
    >
      <ToggleImage date={date} sign={sign} />
      <ToggleTitle sign={sign} />

      <Form role="form" onSubmit={handleSubmit(fetchData)}>
        <Input
          type="date"
          label="Birthday"
          register={register}
          errors={errors}
          errorMessage="Enter your birthday!"
        />

        <Button
          isDisabled={isDisabled}
          isLoading={isLoading}
          type="submit"
          className="bg-primary w-full text-light h-[56px] text-2xl "
          onClick={handleAmplitudeTracking}
        >
          Generate
        </Button>
      </Form>
    </section>
  );
}

export default Card;