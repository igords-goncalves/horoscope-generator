## Analytics — notas e plano de implementação - v1.0.0

Este documento reúne o plano de instrumentação e criação de dados para Amplitude, GA4 (via GTM) e Hotjar, cobrindo eventos, contratos (propriedades), arquivos a serem criados, testes e requisitos de privacidade/consentimento do usuário.

### Objetivos de alto nível (O que será medido)

- Medir conversão (usuário gera um signo), engajamento (visualizações, tempo), e erros.
- Suportar experimentos e funis (date -> generate -> sign_view -> share).
- Garantir conformidade com privacidade (opt-in/out) e evitar PII.

### Arquitetura proposta (arquivos e responsabilidades [Instrumentação e Q&A])
- `service/AmplitudeInitializer.ts` — inicialização do SDK Amplitude.

| Arquivo | Responsabilidade |
|---|---|
| `service/AmplitudeInitializer.ts` | Inicialização do SDK Amplitude |
| `services/Analytics.service.ts` | Wrapper unificado com métodos: `trackEvent(name, props)`, `identify(userId, props)`, `pageView(path, props)` |
| `types/analytics.ts` | Tipos TypeScript para eventos (nomes dos eventos e propriedades esperadas) |
| `docs/analytics/events.md` ou `docs/analytics.json` | Catálogo canônico (fonte de verdade) para CI/tests |

### Variáveis de ambiente recomendadas
- `.env.local`
    - NEXT_PUBLIC_AMPLITUDE_API_KEY=
    - NEXT_PUBLIC_GTM_ID=
    - NEXT_PUBLIC_HOTJAR_ID=
    - NEXT_PUBLIC_APP_VERSION=
    - NEXT_PUBLIC_ENV=development|staging|production

## Integração com GTM / dataLayer
- Sempre push no `window.dataLayer` com um objeto padrão { event, payload } para eventos que devem ser consumidos por GTM/GA4.
- Padronizar nomes de eventos entre Analytics wrapper e dataLayer para evitar duplicações.

### Consentimento & privacidade
- Não enviar eventos que identifiquem ou contenham PII sem consentimento explícito.
- Implementar banner/modal de consentimento que controla o estado global de analytics (armazenar em cookie/localStorage).
- Se usuário negar, respectar e nunca inicializar providers que enviam dados (ou filtrar eventos). Para Amplitude/GA4 pode-se inicializar em modo debug sem enviar dados até opt-in.

## Testes e mocks
- Criar mocks em `__mocks__/analytics.ts` e configurar `jest.setup.js` para injetar mock nas suítes.
- Testes unitários: verificar que chamadas à UI disparam trackEvent com nomes/propriedades corretas.
- E2E: validar entries no `dataLayer` ou, em ambiente de teste, usar o modo debug/console para confirmar que eventos esperados foram emitidos.

## Boas práticas de performance
- Usar `navigator.sendBeacon` ou batching para eventos críticos no unload.
- Não bloquear render; enviar eventos de forma assíncrona e resiliente a falhas.

## Requisitos de aceitação (exemplos)
- Ao selecionar uma data, `select_date` é disparado com propriedade `value` (teste unitário).
- Ao clicar em gerar, `click_generate` é disparado e em seguida `sign_view` quando o resultado aparece (E2E).
- Consentimento: enquanto o usuário não optou pelo tracking, nenhum evento é enviado para Amplitude/GA4 (manual test).

## Próximos passos sugeridos (prioridade)

1. Criar `types/analytics.ts` e `services/Analytics.service.ts` (skeleton) — objetivo: ter contrato único para instrumentação.
2. Criar `docs/analytics/events.md` com o catálogo canônico e exemplos de payloads.
3. Instrumentar eventos críticos na UI: seleção de data, clique gerar, exibição do signo e erros.
4. Implementar consentimento e garantir não envio sem opt-in.

## Checklist rápida (marque conforme avançar)

- [x] SDK do Amplitude configurado e testado
- [x] Criar wrapper `services/Analytics.service.ts`
- [ ] Criar tipos `types/analytics.ts` e catálogo `docs/analytics/events.md`
- [ ] Instrumentar componentes principais (`pages/index.tsx`, `components/Form.tsx`, `Card.tsx`, `Toggle*`)
- [ ] Implementar dataLayer pushes e configurar GTM container (dev)
- [ ] Implementar banner/modal de consentimento
- [ ] Adicionar mocks e testes unitários
- [ ] Criar E2E que valida eventos críticos
- [ ] Criar dashboards iniciais em Amplitude/GA4

## Notas finais
- Mantenha o catálogo de eventos (em `docs/analytics/events.md` ou `docs/analytics.json`) como a fonte de verdade. Idealmente, adicione um pequeno script/teste CI que verifica se eventos usados no código existem no catálogo.
- Se quiser, crio agora o esqueleto do `services/Analytics.service.ts` e dos tipos TypeScript e adiciono mocks para os testes.
