import { Experiment, ExperimentClient, LogLevel } from "@amplitude/experiment-js-client";

export default class AmplitudeExperimentService {
    private static instance: AmplitudeExperimentService;
    private deploymentKey?: string;
    private experiment?: ExperimentClient;
    private featureFlag?: string;

    private constructor(featureFlag?: string) {
        this.deploymentKey = process.env.NEXT_PUBLIC_AMPLITUDE_DEV_DEPLOYMENT_KEY;
        this.featureFlag = featureFlag;
    }

    static getInstance(featureFlag: string): AmplitudeExperimentService {
        if (!AmplitudeExperimentService.instance) {
            AmplitudeExperimentService.instance =
                new AmplitudeExperimentService(featureFlag);
        }
        return AmplitudeExperimentService.instance;
    }

    async initialize(): Promise<void> {
        if (!this.deploymentKey) {
            console.error(
                "Amplitude Experiment deployment key is missing. Please set DEPLOYMENT_KEY in your environment variables."
            );
            return;
        }
        this.experiment = Experiment.initializeWithAmplitudeAnalytics(
            this.deploymentKey, {
                // É possível ajustar o nível de log conforme necessário
                logLevel: LogLevel.Disable,
            }
        );
        // Aqui acontece o assignment automático do usuário
        await this.experiment.fetch();
    }

    getVariant() {
        if (!this.experiment) {
            console.error(
                "Experiment client is not initialized. Please call initialize() first."
            );
            return null;
        }
        // Aqui acontece  exposure automático ao buscar a variante
        const variant = this.experiment.variant(this.featureFlag!);

        if(variant.payload === undefined) {
            console.info("You may want to set a payload in Amplitude Experiment dashboard.")
        }

        return {
            key: variant.key,
            value: variant.value,
            payload: variant.payload,
            metadata: variant.metadata,
        }
    }

    // Método para rastrear manualmente o evento de exposição, se necessário
    trackExposureEvent() {}
}
