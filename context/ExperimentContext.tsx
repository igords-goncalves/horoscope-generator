import { Variant } from "@/types/variant";
import { createContext } from "react";

type ExperimentContextValue = {
    variant: Variant | null;
    loadingExp: boolean | null;
    exposureTracked?: () => void;
}

export const ExperimentContext = createContext<ExperimentContextValue | null>(
    null
);

