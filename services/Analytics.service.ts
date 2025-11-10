import AmplitudeInitializerService from "./AmplitudeInitializer.service";

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
     * e encaminhando o evento para o SDK Amplitude apropriado (browser ou node).
     *
     * Detecta o ambiente de execução:
     *  - No navegador (typeof window !== "undefined"): importa dinamicamente
     *    "@amplitude/analytics-browser" e invoca seu track(name, properties).
     *  - Em servidor/node: importa dinamicamente
     *    "@amplitude/analytics-node" e invoca seu track(payload) com
     *    { event_type, event_properties }.
     */
    async trackEvent(name: string, props: EventProps = {}): Promise<void> {
        if (!this.enabled) return;

        const enriched = this.enrichProps(props);
        this.pushToDataLayer(name, enriched);

        try {
            if (!this.amplitudeInitializer.isInitialized()) {
                await this.amplitudeInitializer.init();
            }

            if (typeof window !== "undefined") {
                // client-side: load browser SDK
                const amplitudeBrowser = await import("@amplitude/analytics-browser");

                await this.invokeTrack(amplitudeBrowser, true, name, enriched);
            } else {
                // server-side: load node SDK
                const amplitudeNode = await import("@amplitude/analytics-node");

                await this.invokeTrack(amplitudeNode, false, name, enriched);
            }
        } catch (err) {
            console.error("trackEvent failed:", err);
        }
    }

    /**
     * Invoca track() do módulo importado, com tratamento unificado de ESM/CJS
     */
    private async invokeTrack(
        dynamicImport: any,
        isBrowser: boolean,
        name: string,
        enriched: EventProps
    ): Promise<void> {
        const trackFn = dynamicImport.track ?? dynamicImport.default?.track;

        if (typeof trackFn !== "function") {
            console.warn(
                `${isBrowser ? "Browser" : "Node"} amplitude SDK track() not available`
            );
            return;
        }

        try {
            if (isBrowser) {
                trackFn(name, enriched);
            } else {
                const payload = {
                    event_type: name,
                    event_properties: enriched,
                };
                trackFn(payload);
            }
        } catch (err) {
            console.error("Amplitude track() invocation failed:", err);
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
