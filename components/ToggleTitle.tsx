import { EVENTS } from "@/constants/events";
import AnalyticsService from "@/services/Analytics.service";
import { useEffect } from "react";

type ToggleTitleProps = {
  title?: string;
  profile?: string;
}

const ToggleTitle = ({title, profile}: ToggleTitleProps) => {
  
  const amplitude = AnalyticsService.getInstance();

  useEffect(() => {
    const handleAmplitudeTracking = () => {
      if(!title) return;
      
      const signKey = EVENTS.SIGN_VIEWED.props.SIGN ?? "sign";
      
      const eventProps = {
        [EVENTS.SIGN_VIEWED.props.GENERATION_TIME_MS]: Date.now(),
        [signKey]: title,
        [EVENTS.SIGN_VIEWED.props.SOURCE]: "ToggleTitle Component",
      }

      amplitude.trackEvent(EVENTS.SIGN_VIEWED.name, eventProps);
    }

    handleAmplitudeTracking();
  }, [amplitude, title]);


  return (
    <div className="title flex w-full flex-col text-center items-center gap-6 text-dark">
        <h1 className="font-[700] text-[2rem]">
          {title ? title : "Sign"}
        </h1>
        <h2 className="text-base h-[56px]">
          {title ? profile : "Short profile sign description"}
        </h2>
      </div>
  )
};

export default ToggleTitle;