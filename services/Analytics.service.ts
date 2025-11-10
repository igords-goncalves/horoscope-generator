import AmplitudeInitializerService from "./AmplitudeInitializer.service";
import * as amplitude from '@amplitude/analytics-browser';

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
            env: this.env,
            mod: typeof window !== "undefined" ? "client" : "server",
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
    async trackEvent(name: string, props: EventProps = {}): Promise<void> {
        if (!this.enabled) return;

        const enriched = this.enrichProps(props);
        this.pushToDataLayer(name, enriched);

        try {
            if (!this.amplitudeInitializer.isInitialized()) {
                await this.amplitudeInitializer.init();
            }
            amplitude.track(name, enriched);
        } catch (err) {
            console.error("trackEvent failed:", err);
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
