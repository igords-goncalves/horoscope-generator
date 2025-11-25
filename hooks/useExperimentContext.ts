import { ExperimentContext } from "@/context/ExperimentContext";
import { useContext } from "react";

export const useExperimentContext = () => {
    const ctx = useContext(ExperimentContext);
    if (!ctx) {
        throw new Error(
            "useExperimentContext must be used within an ExperimentProvider"
        );
    }   
    return ctx;
}