import AmplitudeInitializerService from "./AmplitudeInitializer.service";
import * as amplitude from '@amplitude/analytics-browser';
import { EVENTS } from '@/constants/events';
import type { EventKey, EventPayload } from "@/types/events";

type EventProps = Record<string, any>;

export default class AnalyticsService {
    private static instance: AnalyticsService;
    private amplitudeInitializer = AmplitudeInitializerService.getInstance();

    private enabled: boolean;

    private env: string = process.env.NEXT_PUBLIC_ENVIRONMENT || "development";
    private appVersion: string =
        process.env.NEXT_PUBLIC_APP_VERSION || "unknown";

    private constructor() {
        this.enabled = false; // controla consentimento do usuário
    }

    static getInstance(): AnalyticsService {
        if (!AnalyticsService.instance) {
            AnalyticsService.instance = new AnalyticsService();
        }
        return AnalyticsService.instance;
    }

    /**
     * Chamado quando o usuário opta pelo tracking
     * isso vai servir para GDPR e outras regulações de privacidade
     * em produção pode ser chamado quando o usuário aceitar 
     * cookies, por exemplo. Em ambiente de desenvolvimento
     * pode ser chamado automaticamente com valor = true
     * 
     * @returns {Promise<void>}
     */
    async enable(): Promise<void> {
        if (this.enabled) return;

        this.enabled = true;
        try {
            await this.amplitudeInitializer.init();
        } catch (err) {
            console.warn("Analytics enable failed to init amplitude:", err);
        }
    }

    disable(): void {
        this.enabled = false; // O usuário não consentiu com o tracking
    }

    /**
     * Esse usado para enriquecer propriedades comuns a 
     * todos os eventos, serve passar propriedades extras em cada
     * trackEvent, identify, pageView ...
     * */
    private enrichProps(props: EventProps = {}): EventProps {
        return {
            timestamp: new Date().toISOString(),
            environment: this.env,
            app_version: this.appVersion,
            ...props,
        };
    }

    pushToDataLayer(event: string, payload: EventProps = {}): void {
        if (typeof window === "undefined") return;

        try {
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({ event, payload });
        } catch (err) {
            console.error("pushToDataLayer failed:", err);
        }
    }

    /**
     * Registra um evento de analytics enriquecendo propriedades, enviando para a dataLayer
     * e encaminhando o evento para o SDK Amplitude apropriado.
     */
    async trackEvent(nameOrKey: string, props: EventProps = {}): Promise<void> {
        if (!this.enabled) return;

        // resolve name a partir do catálogo EVENTS quando aplicável
        const resolvedName = (EVENTS as any)[nameOrKey]?.name ?? nameOrKey;

        const enriched = this.enrichProps(props);
        this.pushToDataLayer(resolvedName, enriched);

        try {
            if (!this.amplitudeInitializer.isInitialized()) {
                await this.amplitudeInitializer.init();
            }
            amplitude.track(resolvedName, enriched);
        } catch (err) {
            console.error("trackEvent failed:", err);
        }
    }

    /**
     * Versão tipada do trackEvent que aceita chaves do catálogo (EventKey)
     * e garante o shape do payload via EventPayload<K>. Use a versão mais
     * simples por default, a menos que precise de tipagem forte.
     */
    async trackEventKey<K extends EventKey>(key: K, props: EventPayload<K> = {} as EventPayload<K>): Promise<void> {
        if (!this.enabled) return;

        const resolvedName = (EVENTS as any)[key]?.name ?? (key as string);
        
        const enriched = this.enrichProps(props as Record<string, any>);
        this.pushToDataLayer(resolvedName, enriched);

        try {
            if (!this.amplitudeInitializer.isInitialized()) {
                await this.amplitudeInitializer.init();
            }
            amplitude.track(resolvedName, enriched);
        } catch (err) {
            console.error("trackEventKey failed:", err);
        }
    }

    // async identify(userId?: string, traits: EventProps = {}): Promise<void> {
    //     if (!this.enabled) return;
    //     const enriched = this.enrichProps(traits);
    //     this.pushToDataLayer("identify", { user_id: userId, ...enriched });
    //     try {
    //         const id = new amplitude.Identify();
    //         Object.entries(traits).forEach(([k, v]) => id.set(k, v));
    //         if (userId) amplitude.setUserId(userId);
    //         amplitude.identify(id);
    //     } catch (err) {
    //         console.warn("identify failed:", err);
    //     }
    // }

    // async pageView(path: string, props: EventProps = {}): Promise<void> {
    //     if (!this.enabled) return;
    //     const enriched = this.enrichProps({
    //         path,
    //         title:
    //             props.title ??
    //             (typeof document !== "undefined" ? document.title : undefined),
    //         ...props,
    //     });
    //     this.pushToDataLayer("page_view", enriched);
    //     await this.trackEvent("page_view", enriched);
    // }
}
