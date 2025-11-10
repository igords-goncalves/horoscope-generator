import { useRef } from "react";

type HandleAmplitudeTracking = (value: string, method?: "date-picker" | "manual") => void

/**
 * Custom hook para gerenciar o método de input do usuário (date-picker vs manual).
 * 
 * @param handleAmplitudeTracking 
 * @returns 
 */
export const useInputMethod = (handleAmplitudeTracking: HandleAmplitudeTracking) => {
    // flag para inferir se o último input foi manual (teclado / colar / delete)
    const lastWasManual = useRef(false);

    // onInput captura inserções via teclado/colar — marca como manual
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const ev = e.nativeEvent as InputEvent;
        const inputType = (ev && (ev as any).inputType) || "";
        if (
            inputType.startsWith?.("insert") ||
            inputType === "deleteContentBackward" ||
            inputType === "insertFromPaste"
        ) {
            lastWasManual.current = true;
        }
    };

    // onKeyDown também garante marcação manual quando o usuário digita
    const handleKeyDown = () => {
        lastWasManual.current = true;
    };

    // onChange resolve método a partir da flag (se presente) ou fallback por type/prop
    const handleChange = (value: string) => {
        const method = lastWasManual.current ? "manual" : undefined;
        handleAmplitudeTracking(value, method);
        lastWasManual.current = false; // reset após envio
    };

    return { handleInput, handleKeyDown, handleChange};
};
