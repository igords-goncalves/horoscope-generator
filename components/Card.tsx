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
import { EVENTS } from "@/constants/events";
import ShareButton from "./ShareButton";
import { useExperimentContext } from "@/hooks/useExperimentContext";

const Card = (): JSX.Element => {
    const [date, setDate] = useState<number>();
    const [sign, setSign] = useState<SignModel>();
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [requestStart, setRequestStart] = useState<number>(0);
    const [latencyMs, setLatencyMs] = useState<number>(0);
    const { isLoading, setIsLoading } = useIsLoadingData();

    const { variant } = useExperimentContext();

    const horoscopeGenService = new HoroscopeGenService();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const birthday = watch("birthday");

    useEffect(() => {
        parseDate({ birthday: birthday, setDate });
    }, [birthday]);

    async function fetchData() {
        try {
            setRequestStart(Date.now());
            setIsLoading(true);
            setIsDisabled(true);
            const response = await horoscopeGenService.get(`/api/sign/${date}`);
            const data = await response.data;
            setSign(data);
        } catch (error: unknown) {
            console.error(error);
            throw new Error(error?.toString());
        } finally {
            setIsDisabled(false);
            setIsLoading(false);
            setLatencyMs(Date.now() - requestStart);
        }
    }

    const amplitude = AnalyticsService.getInstance();

    const handleAmplitudeTracking = () => {
        const eventProps = {
            [EVENTS.GENERATE_CLICKED.props.LATENCY_MS]: latencyMs,
        };
        amplitude.trackEvent(EVENTS.GENERATE_CLICKED.name, eventProps);
    };

    return (
        <section
            data-testid="card-testid"
            className="mr-5 ml-5 card flex flex-col items-center bg-card h-screen pb-10 w-full max-w-[470px] max-h-[544px] rounded-3xl px-5 sm:px-16 pt-8 gap-4"
        >
            <ToggleImage date={date} image={sign?.image} />
            <ToggleTitle title={sign?.title} profile={sign?.profile} />
            <ShareButton
                date={date}
                isLoading={isLoading}
                isDisabled={isDisabled}
                errors={errors}
            />

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
                    {/* {variant?.value === "treatment"
                        ? "Discover Now!"
                        : "Generate Horoscope"} */}
                    {variant?.value === "treatment"
                        ? variant?.payload?.label
                        : "Generate"}
                </Button>
            </Form>
        </section>
    );
};

export default Card;
