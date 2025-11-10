## Mapeamento Gherkin -> Testes (Jest vs Cypress)

Este documento descreve como os arquivos de especificação Gherkin em `docs/app-features/*.feature` devem ser convertidos em testes automatizados usando:

- Testes unitários/componentes: Jest + React Testing Library
- Testes end-to-end (E2E): Cypress
- Testes de acessibilidade: jest-axe (unit) e cypress-axe (E2E)

Use as tags nas features para orientar a conversão:

- `@unit` — implementar como teste(s) Jest (funcionalidades isoladas, helpers, parseDate, componentes)
- `@e2e` — implementar como teste(s) Cypress (fluxo completo do usuário, intercepts de rede, analytics)
- `@accessibility` — incluir checagens com axe (pode ser implementado tanto em Jest quanto em Cypress conforme o cenário)

## Convenções de projetos e caminhos sugeridos

- Features (documentação Gherkin): `docs/app-features/*.feature`
- Testes Jest (unit/component): `__test__/*.spec.tsx` ou `__test__/unit/*.spec.ts`
- Testes Cypress (E2E): `cypress/e2e/*.spec.ts`
- Helpers/mocks para analytics: `__test__/mocks/amplitudeMock.ts` e `cypress/support/analytics.ts`

## Mapeamento recomendado por feature

- `ui.feature`
	- Cenários marcados `@unit`: validar `parseDate.ts`, componentes `Form`, `Input`, `Card`, `ToggleImage`, `ToggleTitle`. Path exemplo: `__test__/Form.spec.tsx`.
	- Cenários marcados `@e2e`: implementar fluxo de preencher data e visualizar resultado. Path exemplo: `cypress/e2e/ui.happy-path.spec.ts`.

- `e2e.feature`
	- Todos `@e2e`: fluxos completos, intercept de analytics, responsividade e checks a11y com `cypress-axe`.

- `analytics.feature`
	- `@unit`: testes de contrato do helper que monta payloads (Jest).
	- `@e2e`: intercepts em Cypress para validar envio de `horoscope_view`, `share_attempt` com payloads mínimos.

- `accessibility.feature`
	- `@unit`: usar `jest-axe` em componentes isolados.
	- `@e2e`: usar `cypress-axe` para checagens no fluxo (injetar axe e rodar `cy.checkA11y()`).

- `persistence.feature`
	- `@unit`: testes para helpers de persistência (mock `localStorage`, fallback em memória).
	- `@e2e`: cenários de sincronização entre abas (`storage` event) e limpeza de estado.

- `offline.feature`
	- `@unit`: testes para lógica de enfileiramento (fila em memória ou IndexedDB mockada).
	- `@e2e`: simular offline/online (network throttling/emulation) e validar retry/backoff e indicadores UI.

- `security.feature`
	- `@unit`: validar sanitizadores/escapadores de texto antes de renderizar (tests Jest).
	- `@e2e`: injeção de payloads maliciosos para garantir ausência de execução de scripts.

- `performance.feature`
	- `@unit`: garantir placeholders/skeletons renderizam rápido e não bloqueiam layout.
	- `@e2e`: testar lazy-loading de imagens e comportamento sob throttling de rede.

- `experiments.feature` (opcional)
	- `@unit`: lógica de atribuição de variante e regras de dedupe.
	- `@e2e`: validar que variantes adicionam metadata aos eventos analytics sem duplicações.

## Exemplos de casos e onde implementá-los

- Gherkin: "Consulta válida com data completa" (`@e2e @unit`)
	- Jest: teste do helper `parseDate` com a entrada `1990-04-15` e componente `Form` (mock de `HoroscopeGen.service`).
	- Cypress: `cypress/e2e/ui.happy-path.spec.ts` — `cy.visit('/')`, preencher campo, `cy.click('Consultar')`, `cy.get('.card').contains('Áries')`, intercept analytics e validar payload.

- Gherkin: "Data inválida (formato incorreto)" (`@e2e`)
	- Cypress: testar validação do formulário, assert mensagem de erro e garantir que nenhuma request de analytics com `horoscope_view` foi enviada (`cy.intercept` + `cy.should('not.have.been.called')`).

## Dados de teste / fixtures sugeridas

- `fixtures/signs.json` (ex.: pares date -> sign)
- Datas de borda: `2000-02-29`, `1995-07-23` (troca de signo), `2020-03-20`/`2020-03-21`
- Erros/invalidos: `""`, `"31-02-2020"`, `"15/04/1990"`

## Helpers e mocks de analytics

- Jest: mock para `Amplitude`/`Http.service` que captura payloads e permite asserts unitários no helper de analytics.
- Cypress: `cypress/support/analytics.ts` com `cy.intercept('POST', '/collect|/amplitude|/analytics', (req) => { req.alias = 'analytics' })` e utilitário `cy.waitForAnalytics()`.

## Critérios de aceitação (PASS / FAIL)

Para cada cenário Gherkin mapeado:

- PASS: Todos os passos `Then` são validados por asserts automatizados (DOs quando aplicável + a11y checks quando marcado).M + analytic
- FAIL: Qualquer assert falha ou eventos analytics ausentes/incorretos.

Exemplo — "Consulta válida": PASS quando nome do signo correto aparece, descrição e imagem visíveis e evento `horoscope_view` enviado com `sign` e `source`.

## Como rodar os testes (comandos)

Rodar Jest (unit tests):

```powershell
npm run test
# ou em modo watch
npm run test:watch
```

Rodar Cypress (aberto):

```powershell
npx cypress open
```

Rodar Cypress headless (CI):

```powershell
npx cypress run --spec "cypress/e2e/ui.happy-path.spec.ts"
```

Rodar um único teste Jest (por nome/pattern):

```powershell
npm run test -- -t "Form deve validar campo vazio"
```

## Boas práticas e notas

- Priorize escrever um teste unitário para helpers puros (ex.: `parseDate`) antes de escrever o fluxo E2E que depende dele.
- Use intercepts no Cypress para desacoplar a verificação de analytics da infraestrutura externa.
- Inclua checagem de a11y (axe) nos fluxos críticos e nos componentes que mudam dinamicamente.
- Mantenha fixtures pequenas e fáceis de ler; versione-as em `cypress/fixtures` e `__test__/fixtures`.

---

Se quiser, eu posso agora gerar os esboços de arquivos de teste (Jest + Cypress) e os helpers de analytics/axe — diga se devo criar os arquivos automaticamente e eu aplico as alterações. 

