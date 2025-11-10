import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import AnalyticsService from "@/services/Analytics.service";

type InputProps = {
  type?: string;
  register: UseFormRegister<FieldValues>;
  label?: string;
  errors?: FieldErrors<FieldValues>;
  errorMessage?: string;
};

const Input = ({ type, register, label, errors, errorMessage }: InputProps) => {

  const amplitude = AnalyticsService.getInstance();

  const handleAmplitudeTracking = (value: string) => {
    amplitude.trackEvent("Input Birthday Changed", { birthday: value });
  }

  return (
    <div className="flex flex-col items-start w-full">
      <label htmlFor="date" className="text-slate-400 text-xs pb-1 ml-2">
        {label}
      </label>
      <input
        id="date"
        type={type}
        {...register("bday", { required: true })}
        className="border-1 h-[56px] px-4 rounded-2xl text-dark w-full"
        onChange={(e) => {
          handleAmplitudeTracking(e.target.value);
        }}
      />
      {errors?.bday && (
        <p className="text-red-500 text-xs ml-2 mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
 