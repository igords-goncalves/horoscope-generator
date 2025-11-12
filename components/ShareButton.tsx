import { EVENTS } from "@/constants/events";
import AnalyticsService from "@/services/Analytics.service";
import {
    FacebookLogoIcon,
    InstagramLogoIcon,
    TiktokLogoIcon,
    XLogoIcon,
    RedditLogoIcon,
    LinkSimpleBreakIcon,
} from "@phosphor-icons/react";
import { FieldErrors, FieldValues } from "react-hook-form";

type ShareButtonProps = {
    date?: number;
    isLoading?: boolean;
    isDisabled?: boolean;
    errors: FieldErrors<FieldValues>;
};

const SOCIALPLATFORMS = [
    {
        name: "Facebook",
        url: "https://www.facebook.com/sharer/sharer.php?u=",
        icon: <FacebookLogoIcon size={18} />,
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/?url=",
        icon: <InstagramLogoIcon size={18} />,
    },
    {
        name: "Twitter",
        url: "https://twitter.com/intent/tweet?url=",
        icon: <XLogoIcon size={18} />,
    },
    {
        name: "Reddit",
        url: "https://www.reddit.com/submit?url=",
        icon: <RedditLogoIcon size={18} />,
    },
    {
        name: "TikTok",
        url: "https://www.tiktok.com/share?url=",
        icon: <TiktokLogoIcon size={18} />,
    },
];

const getShareUrl = (date?: number) => {
    if (typeof window === "undefined") return "";

    const origin = window.location.origin;
    const shareUrl = date ? `${origin}/?bday=${date}` : origin;
    return shareUrl;
};

const ShareButton = ({ date, isLoading, isDisabled, errors }: ShareButtonProps) => {
    const amplitude = AnalyticsService.getInstance();

    const handleTracking = (platform: string) => {
        const eventProps = {
            [EVENTS.SHARE_ATTEMPTED.name]: platform,
            [EVENTS.SHARE_ATTEMPTED.props.CHANNEL]: "various",
        };

        amplitude.trackEvent(EVENTS.SHARE_ATTEMPTED.name, eventProps);
    };

    return (
        <div className="flex gap-4">
            {SOCIALPLATFORMS.map((platform) => (
                <a
                    key={platform.name}
                    href={`
                        ${platform.url}
                        ${encodeURIComponent(
                            typeof window === "undefined"
                                ? ""
                                : window.location.href
                        )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-100 hover:text-primary"
                    // Fix para evitar compartilhamento quando o botão está desabilitado
                    onClick={
                        isDisabled && errors.birthday
                            ? (e) => e.preventDefault()
                            : () => handleTracking(platform.name)
                    }
                    aria-disabled={isDisabled}
                    aria-busy={isLoading}
                >
                    {platform.icon}
                </a>
            ))}
            <button
                type="button"
                onClick={() => {
                    navigator.clipboard?.writeText(getShareUrl());
                    handleTracking("Copy link");
                }}
                className="flex items-center gap-2 px-2 border border-gray-300 rounded-md hover:bg-gray-100 hover:text-primary"
            >
                <LinkSimpleBreakIcon size={18} />
            </button>
        </div>
    );
};

export default ShareButton;
