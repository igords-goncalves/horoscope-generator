import * as amplitude from "@amplitude/analytics-browser";

export default class AmplitudeInitializerService {
    private static instance: AmplitudeInitializerService;
    private initialized: boolean;
    private clientKey?: string;

    public constructor() {
        this.initialized = false;
        this.clientKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
    }

    /**
     * Cria uma nova instância se ainda não existir uma. Isso garante que apenas
     * uma instância do Amplitude seja usada em toda a aplicação, ou seja, tudo vai passar
     * por dentro dessa instância.
     *
     * @returns {AmplitudeInitializerService} A instância singleton
     */
    static getInstance(): AmplitudeInitializerService {
        if (!AmplitudeInitializerService.instance) {
            AmplitudeInitializerService.instance =
                new AmplitudeInitializerService();
        }
        return AmplitudeInitializerService.instance;
    }

    private isClientEnvironment(): boolean {
        return typeof window !== "undefined" && typeof document !== "undefined";
    }

    async init() {
        if (this.initialized) return;

        /**
         * Só vai cair nessa condição se estiver no cliente side
         * Adiciona robustez para verificação de ambientes
         */
        if (this.isClientEnvironment()) {
            if (!this.clientKey) {
                console.error(
                    "Amplitude API key is missing. Please set NEXT_PUBLIC_AMPLITUDE_API_KEY in your environment variables."
                );
                return;
            }

            try {
                /**
                 * Retorna um objeto com a propriedade "promise",
                 * que já é resolvido quando a inicialização estiver completa
                 */
                await amplitude.init(this.clientKey, {
                    autocapture: {
                        pageViews: false,
                        formInteractions: false,
                        elementInteractions: false,
                        sessions: false,
                    },
                    appVersion: process.env.NEXT_PUBLIC_APP_VERSION || "unknown",
                }).promise;
                this.initialized = true;
                console.info("Amplitude initialized (browser)");
            } catch (error) {
                console.error("Failed to initialize Amplitude (browser):", error);
                throw new Error(
                    "Amplitude initialization failed: " + (error as Error).message
                );
            }
        }
    }

    // Expõe estado para consumidores (AnalyticsService / providers)
    isInitialized(): boolean {
        return this.initialized;
    }
}
