import { PropsWithChildren, useEffect, useState } from "react";
import { ExperimentContext } from "./ExperimentContext";
import AmplitudeExperimentService from "@/services/AmplitudeExperiment.service";
import { Variant } from "@/types/variant";

type ExperimentProviderProps = PropsWithChildren<{
    featureFlag: string;
}>;

function ExperimentProvider({
    children,
    featureFlag,
}: ExperimentProviderProps) {
    const [variant, setVariant] = useState<Variant | null>(null);
    const [loadingExp, setLoadingExp] = useState<boolean | null>(null);

    useEffect(() => {
        const experiment =
            AmplitudeExperimentService.getInstance(featureFlag);
        
            experiment.initialize().then(() => {
            const variant = experiment.getVariant();

            setVariant(variant as Variant);
        }).catch((error) => {
            console.error("Error initializing experiment:", error);
        }).finally(() => {
            setLoadingExp(false);
        });
    }, [featureFlag]);

    const value = {
        variant,
        loadingExp,
    }

    return (
        <ExperimentContext.Provider value={value}>
            {children}
        </ExperimentContext.Provider>
    );
}

export default ExperimentProvider;
