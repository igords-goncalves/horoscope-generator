import { FieldErrors, FieldValues, set, UseFormRegister } from "react-hook-form";
import React from "react";
import AnalyticsService from "@/services/Analytics.service";
import { EVENTS } from "@/constants/events";
import { useInputMethod } from "@/hooks/useInputMethod";

type InputProps = {
    type?: string;
    register: UseFormRegister<FieldValues>;
    label?: string;
    errors?: FieldErrors<FieldValues>;
    errorMessage?: string;
    inputMethod?: "date-picker" | "manual";
};

const Input = ({
    type,
    register,
    label,
    errors,
    errorMessage,
    inputMethod,
}: InputProps) => {
    const amplitude = AnalyticsService.getInstance();
    const { handleInput, handleKeyDown, handleChange } = useInputMethod(
        handleAmplitudeTracking
    );

    // Utilizar um debaounced function 
    // aqui se necessário para otimizar
    // o numero de disparos de eventos 
    // de mudança de input
    async function handleAmplitudeTracking(
        value: string,
        method?: "date-picker" | "manual"
    ) {
        const resolvedMethod =
            method ??
            inputMethod ??
            (type === "date" ? "date-picker" : "manual");

        const eventProps = {
            [EVENTS.DATE_SELECTED.props.INPUT_METHOD]: resolvedMethod,
            [EVENTS.DATE_SELECTED.props.VALUE]: value,
        };

        amplitude.trackEvent(EVENTS.DATE_SELECTED.name, eventProps);
    }

    return (
        <div className="flex flex-col items-start w-full">
            <label htmlFor="date" className="text-slate-400 text-xs pb-1 ml-2">
                {label}
            </label>
            <input
                id="date"
                type={type}
                {...register("birthday", { required: true })}
                className="border-1 h-[56px] px-4 rounded-2xl text-dark w-full"
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                // refatorar e melhorar essa lógica de disparos de evento quando o input mudar
                onChange={(e) => {
                    handleChange(e.target.value);
                  }}
            />
            {errors?.birthday && (
                <p className="text-red-500 text-xs ml-2 mt-2">{errorMessage}</p>
            )}
        </div>
    );
};

export default Input;
