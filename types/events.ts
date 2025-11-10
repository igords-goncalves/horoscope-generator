import { EVENTS } from "@/constants/events";

export type EventKey = keyof typeof EVENTS;

export type TimestampString = string; // ISO-8601

export interface BaseEventProps {
  timestamp?: TimestampString;
  env?: string;
  app_version?: string;
}

export interface DateSelectedProps extends BaseEventProps {
  input_method: 'date-picker' | 'manual';
  value: string; // YYYY-MM-DD
}

export interface GenerateClickedProps extends BaseEventProps {
  latency_ms?: number;
}

export interface SignViewedProps extends BaseEventProps {
  sign: string;
  generation_time_ms?: number;
  source?: 'client' | 'server';
}

export interface ShareAttemptedProps extends BaseEventProps {
  channel: 'twitter' | 'whatsapp' | 'copy' | 'other';
  sign: string;
}

export interface ErrorOccurredProps extends BaseEventProps {
  stage: 'validation' | 'generation' | 'network';
  message: string;
  code?: string;
}

export interface PageViewedProps extends BaseEventProps {
  path: string;
  title?: string;
}

// Mapeamento de chaves para payloads (parcial — estender conforme necessidade)
export interface EventPayloadMap {
  DATE_SELECTED: DateSelectedProps;
  GENERATE_CLICKED: GenerateClickedProps;
  SIGN_VIEWED: SignViewedProps;
  SHARE_ATTEMPTED: ShareAttemptedProps;
  ERROR_OCCURRED: ErrorOccurredProps;
  PAGE_VIEWED: PageViewedProps;
  IDENTIFY: BaseEventProps & { user_id?: string; consent?: boolean };
  EXPERIMENT_VIEW: BaseEventProps & { experiment_key?: string; variant?: string };
}

/**
 * Mapeia uma chave de evento para o tipo do seu payload.
 *
 * Tipo genérico que, dado um identificador de evento (K extends EventKey),
 * resolve para o shape tipado do payload declarado em EventPayloadMap.
 * - Se K corresponder a uma chave conhecida em EventPayloadMap, o tipo
 *   resultante é o payload específico associado (com todas as propriedades
 *   obrigatórias/optionais corretamente tipadas).
 * - Se K não for uma chave mapeada, faz fallback para Record<string, any>,
 *   permitindo payloads dinâmicos ou extensões sem quebrar a tipagem.
 *
 * Objetivo: fornecer segurança em tempo de compilação ao construir e
 * enviar eventos de analytics, garantindo que os dados enviados para
 * eventos conhecidos respeitem o contrato esperado, mas ainda permitindo
 * flexibilidade para eventos não-tipados.
 *
 * @template K - Chave do evento (geralmente uma das chaves de EVENTS / EventKey)
 */
export type EventPayload<K extends EventKey> = K extends keyof EventPayloadMap
  ? EventPayloadMap[K]
  : Record<string, any>;

export default EVENTS;
