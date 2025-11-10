## Catálogo canônico de eventos — Horoscopo Generator (Design de Taxonomia de Dados)

Este arquivo é a fonte de verdade para eventos de analytics usados pela aplicação. Use-o para validar instrumentação, mocks de teste e integrações (Amplitude / GA4 via GTM). Esse documento segue o fluxo de criação de dados abordando a etapa de Design de Taxonomia de Dados.

Formato recomendado:
- nome do evento: descrição curta seguindo o formato: 
    - `Pascal Case` (ex: `Date Selected`) com substantivo e verbo no pretérito.
- descrição: breve explicação do evento
- propriedades: lista de propriedades com tipos e exemplos seguindo o formato:
  - `property_name` type (descrição)

Observações de contrato mínimo (boilerplate):
- `timestamp` (string ISO-8601)
- `env` ("dev" | "staging" | "prod") — usar `NEXT_PUBLIC_ENV`
- `app_version` (semver)

Padrões operacionais:
- Ao emitir eventos que também devem ser consumidos pelo GTM, faça um push para `window.dataLayer` com `{ event: string, payload: object }`.
- Não incluir PII sem consentimento explícito. Se o usuário negar tracking, não inicializar provedores que enviam dados (Amplitude/GA4) ou filtrar eventos.

---

### Evento: Date Selected
- Descrição: usuário seleciona uma data no formulário
- Propriedades:
  - `input_method`: 'date-picker' | 'manual'
  - `value`: 'YYYY-MM-DD'
  - `timestamp`
  - `env`, `app_version`

Exemplo:
```json
{
  "event": "Date Selected",
  "payload": {
    "input_method": "date-picker",
    "value": "1990-04-15",
    "timestamp": "2025-11-09T12:34:56.000Z",
    "env": "prod",
    "app_version": "1.2.3"
  }
}
```

### Evento: Generate Clicked
- Descrição: usuário clica no botão que dispara a geração do signo
- Propriedades:
  - `timestamp`
  - `latency_ms` (opcional) — latência da geração quando conhecida
  - `env`, `app_version`

Exemplo:
```json
{
  "event": "click_generate",
  "payload": {
    "timestamp": "2025-11-09T12:35:00.000Z",
    "latency_ms": 120,
    "env": "prod",
    "app_version": "1.2.3"
  }
}
```

### Evento: Sign Viewed
- Descrição: o signo gerado é exibido ao usuário
- Propriedades:
  - `sign`: nome do signo (ex: 'Aries')
  - `generation_time_ms`: tempo total de geração (opcional)
  - `source`: 'client' | 'server'
  - `timestamp`, `env`, `app_version`

Exemplo:
```json
{
  "event": "sign_view",
  "payload": {
    "sign": "Aries",
    "generation_time_ms": 180,
    "source": "client",
    "timestamp": "2025-11-09T12:35:01.800Z",
    "env": "prod",
    "app_version": "1.2.3"
  }
}
```

### Evento: Share Attempted
- Descrição: usuário tenta compartilhar o resultado (qualquer canal)
- Propriedades:
  - `channel`: 'twitter' | 'whatsapp' | 'copy' | 'other'
  - `sign`
  - `timestamp`, `env`, `app_version`

Exemplo:
```json
{
  "event": "share",
  "payload": {
    "channel": "whatsapp",
    "sign": "Aries",
    "timestamp": "2025-11-09T12:36:00.000Z",
    "env": "prod",
    "app_version": "1.2.3"
  }
}
```

### Evento: Error Occurred
- Descrição: erro na geração ou validação de data
- Propriedades:
  - `stage`: 'validation' | 'generation' | 'network'
  - `message`: string (mensagem de erro tratada — evitar PII)
  - `code`?: string (opcional)
  - `timestamp`, `env`, `app_version`

Exemplo:
```json
{
  "event": "error",
  "payload": {
    "stage": "validation",
    "message": "invalid_date_format",
    "code": "INVALID_INPUT",
    "timestamp": "2025-11-09T12:37:00.000Z",
    "env": "prod",
    "app_version": "1.2.3"
  }
}
```

### Evento: Page Viewed
- Descrição: visualização de página (padrão para GA4)
- Propriedades:
  - `path`
  - `title`
  - `timestamp`, `env`, `app_version`

Exemplo:
```json
{
  "event": "page_view",
  "payload": {
    "path": "/",
    "title": "Home",
    "timestamp": "2025-11-09T12:30:00.000Z",
    "env": "prod",
    "app_version": "1.2.3"
  }
}
```

### Evento: Identify
- Descrição: quando há intenção de identificar usuário (ex.: opt-in) — evitar PII
- Propriedades sugeridas (não enviar PII sem consentimento):
  - `user_id?` (anon_id recomendado)
  - `consent`: boolean (opt-in)
  - `timestamp`, `env`, `app_version`

Exemplo:
```json
{
  "event": "identify",
  "payload": {
    "user_id": "anon_1234",
    "consent": true,
    "timestamp": "2025-11-09T12:40:00.000Z",
    "env": "prod",
    "app_version": "1.2.3"
  }
}
```

---

## Recomendações de implementação
- Criar `types/analytics.ts` com tipos TypeScript para cada evento e suas propriedades.
- Implementar `services/Analytics.service.ts` com métodos: `trackEvent(name, props)`, `identify(userId, props)`, `pageView(path, props)`.
- Adicionar `__mocks__/analytics.ts` e configurar `jest.setup.js` para injetar mocks nas suítes de teste.

### Boas práticas

- Disparar "Date Selected" apenas quando o usuário confirmar a escolha (ex.: onBlur, onSubmit ou quando o date-picker nativo/reporta a seleção final).
  - Se for necessário rastrear cada alteração do input (digitação), criar evento separado: `Date Input Changed` com propriedade `value` e usar debounce para reduzir ruído.

## Critérios de aceitação (exemplos de testes)
- Ao selecionar uma data, `Date Selected` é disparado com propriedade `value`.
- Ao clicar em gerar, `Generate Clicked` é disparado e `Sign Viewed` é emitido quando o resultado aparece.
- Enquanto o usuário não optou pelo tracking, nenhum evento é enviado para Amplitude/GA4 (teste manual/automático com mock).

## Notas finais
- Mantenha este arquivo como fonte de verdade. Se os eventos mudarem, atualize também `docs/analytics-plan-v1.0.0.md` e os tipos em `types/analytics.ts`.
