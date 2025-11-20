import { Experiment, ExperimentClient } from "@amplitude/experiment-js-client";

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
            this.deploymentKey,
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
        // Aqui acontece o exposure automático ao buscar a variante
        const variant = this.experiment.variant(this.featureFlag!);

        return {
            key: variant.key,
            value: variant.value,
            payload: variant.payload,
            metadata: variant.metadata,
        }
    }

    assignUserToExperiment() {
        const variant = this.getVariant();
        if (variant || variant!.key !== "off") return;

        // Se variant é off significa que o teste está desativado
        // logo não faz sentido atribuir o usuário
    }

    trackExposureEvent() {}
}
