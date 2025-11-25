# Framework para Criação de Hipóteses

## Estrutura Base

Toda hipótese deve seguir o formato:

```
Nós acreditamos que [MUDANÇA]
Para [PERSONA]
Resultará em [MÉTRICA]
Saberemos que foi bem-sucedida quando [CRITÉRIO DE SUCESSO]
```

## Exemplo Completo

### Hipótese: Simplificar Input de Data

**Nós acreditamos que** adicionar um date picker visual (calendário dropdown)  
**Para** Maria (A Curiosa Casual) e usuários mobile  
**Resultará em** aumento de 20% na conversion rate de `Page Viewed` → `Date Selected`  
**Saberemos que foi bem-sucedida quando** atingirmos:
- Date Selected rate: 42% → 50%+ (primários dias)
- Abandono <15s: 47% → 35%
- Mobile completion: 28% → 38%

---

## Catálogo de Hipóteses para Testar

### Problema 1: Abandono no Formulário

#### H1.1: Placeholder com Exemplo
```
Nós acreditamos que adicionar placeholder "Ex: 1990-04-15" no input
Para todos os usuários (foco Maria - mobile)
Resultará em redução de 15% em erros de formato
Saberemos que foi bem-sucedida quando:
- Taxa de erro de formato: 23% → <15%
- Date Selected rate: 42% → 48%
```

**Métricas de sucesso:**
- Primary: `Date Selected` rate
- Secondary: `Error rate`, `Time to first interaction`
- Guardrail: Page bounce rate <5% increase

---

#### H1.2: Date Picker Visual
```
Nós acreditamos que substituir input texto por date picker nativo/visual
Para Maria e usuários mobile (78% do tráfego)
Resultará em aumento de 25% em Date Selected
Saberemos que foi bem-sucedida quando:
- Date Selected: 42% → 52%+
- Mobile completion: 28% → 40%+
```

**Variantes para A/B test:**
- Control: Input texto atual
- Variant A: Date picker nativo (HTML5)
- Variant B: Custom calendar picker (React)

---

#### H1.3: Mensagens de Erro Aprimoradas
```
Nós acreditamos que melhorar feedback de erros (cor, posição, texto claro)
Para todos os usuários
Resultará em aumento de retry rate após erro
Saberemos que foi bem-sucedida quando:
- Retry rate: 18% → 35%+
- Abandono pós-erro: 82% → <60%
```

---

### Problema 2: Baixo Share Rate

#### H2.1: Reposicionar Botão de Share
```
Nós acreditamos que mover botão de share para "above the fold"
Para João (O Divulgador Social) e usuários mobile
Resultará em aumento de 30% em cliques no botão
Saberemos que foi bem-sucedida quando:
- Click rate: 18% → 23%+
- Share Attempted: 4% → 6%+
```

**Variantes:**
- Control: Botão na parte inferior
- Variant A: Botão no topo (após título do signo)
- Variant B: Floating action button (sempre visível)

---

#### H2.2: Toast Confirmation
```
Nós acreditamos que adicionar toast "Link copiado!" após share
Para João e todos os usuários
Resultará em aumento de 40% na conversion clique→evento
Saberemos que foi bem-sucedida quando:
- Click-to-event conversion: 22.4% → 31%+
- Perceived success rate (survey): +50%
```

---

#### H2.3: Pre-popular Mensagem de Share
```
Nós acreditamos que pre-popular texto com "Descobri que sou [SIGNO]! 🔮"
Para João e usuários sociais
Resultará em aumento de 25% em shares completos
Saberemos que foi bem-sucedida quando:
- Share Attempted: 4% → 5%+
- Actual shares completed (tracking): +30%
```

---

### Problema 3: Performance

#### H3.1: Lazy-load Analytics
```
Nós acreditamos que carregar Amplitude/GTM de forma assíncrona
Para Ana (A Impaciente) e todos os usuários
Resultará em redução de 60% no First Input Delay
Saberemos que foi bem-sucedida quando:
- FID P95: 420ms → <170ms
- Abandono <3s: 32% → <20%
```

**Implementação:**
```typescript
// Mover init para requestIdleCallback ou depois de LCP
```

---

#### H3.2: Otimizar SVGs dos Signos
```
Nós acreditamos que comprimir/otimizar SVGs de 450KB → <50KB
Para Ana e usuários mobile (4G)
Resultará em redução de 70% no LCP
Saberemos que foi bem-sucedida quando:
- LCP P95: 5.2s → <2.5s
- Abandono em pico: 22% → <12%
```

---

#### H3.3: Skeleton Loading
```
Nós acreditamos que adicionar skeleton screen durante carregamento
Para Ana e todos os usuários
Resultará em redução de perceived latency
Saberemos que foi bem-sucedida quando:
- Perceived load time (survey): -30%
- Abandono durante loading: 15% → <10%
```

---

### Problema 4: Confusão Cúspide

#### H4.1: Tooltip Educacional
```
Nós acreditamos que adicionar tooltip "Nasceu na cúspide? Clique aqui"
Para Pedro (O Cético) e usuários de datas de transição
Resultará em redução de 50% em reconsultas
Saberemos que foi bem-sucedida quando:
- Taxa de reconsulta: 8.4% → <4%
- Confidence score (survey): +40%
```

---

#### H4.2: Input de Hora de Nascimento (opcional)
```
Nós acreditamos que adicionar campo "Hora de nascimento (opcional)"
Para Pedro e usuários de cúspide
Resultará em aumento de precisão percebida
Saberemos que foi bem-sucedida quando:
- % que fornece hora: >15%
- Reconsultas: 8.4% → <3%
- Trust score: +35%
```

---

### Problema 5: Retenção

#### H5.1: Save/Bookmark Prompt
```
Nós acreditamos que adicionar prompt "Salvar meu resultado"
Para Camila (A Descobridora) e usuários orgânicos
Resultará em aumento de 25% em return rate D7
Saberemos que foi bem-sucedida quando:
- Return rate D7: 12% → 15%+
- % que salva: >20%
```

**Variantes:**
- Variant A: Modal após resultado
- Variant B: Banner persistente no topo
- Variant C: PWA install prompt

---

#### H5.2: Email Weekly Reminder
```
Nós acreditamos que coletar email e enviar "horóscopo semanal"
Para Camila e usuários de baixa retention
Resultará em aumento de 40% em return rate D30
Saberemos que foi bem-sucedida quando:
- Email capture rate: >15%
- Open rate: >25%
- Return rate D30: 5% → 7%+
```

---

## Priorização de Testes (ICE Framework)

| ID    | Hipótese                  | Impact | Confidence | Ease | Score | Status |
|-------|---------------------------|--------|------------|------|-------|---------|
| H1.2  | Date picker visual        | 9      | 8          | 7    | 8.0   | 🟢 Go   |
| H3.2  | Otimizar SVGs             | 8      | 9          | 8    | 8.3   | 🟢 Go   |
| H2.2  | Toast confirmation        | 7      | 8          | 9    | 8.0   | 🟢 Go   |
| H3.1  | Lazy-load analytics       | 8      | 9          | 6    | 7.7   | 🟡 Maybe |
| H1.3  | Mensagens de erro         | 7      | 7          | 8    | 7.3   | 🟡 Maybe |
| H5.1  | Save/bookmark prompt      | 7      | 6          | 7    | 6.7   | 🟡 Maybe |
| H4.1  | Tooltip cúspide           | 5      | 7          | 9    | 7.0   | 🟡 Maybe |
| H5.2  | Email reminder            | 8      | 5          | 3    | 5.3   | 🔴 Later |
| H4.2  | Input hora nascimento     | 6      | 4          | 4    | 4.7   | 🔴 Later |

---

## Roadmap de Testes (Q1 2025)

### Sprint 1 (Semanas 1-2)
- [ ] H3.2: Otimizar SVGs (quick win)
- [ ] H2.2: Toast confirmation (quick win)
- [ ] Setup: Configurar Amplitude Experiment

### Sprint 2 (Semanas 3-4)
- [ ] H1.2: A/B test date picker (3 variantes)
- [ ] Analytics: Monitorar métricas de sucesso

### Sprint 3 (Semanas 5-6)
- [ ] H3.1: Lazy-load analytics
- [ ] H1.3: Melhorar mensagens de erro
- [ ] Review: Análise de resultados dos testes anteriores

### Sprint 4 (Semanas 7-8)
- [ ] H5.1: Save/bookmark prompt
- [ ] H4.1: Tooltip cúspide
- [ ] Final review: Compilar learnings e próximos passos

---

## Template de Test Plan

Para cada hipótese, criar documento seguindo:

```markdown
# Test Plan: [ID] [Nome da Hipótese]

## 1. Objetivo
[Descrever o que queremos aprender]

## 2. Hipótese
[Formato completo da hipótese]

## 3. Métricas
### Primary Success Metric
- Métrica: [nome]
- Baseline: [valor atual]
- Target: [valor alvo]
- MDE (Minimum Detectable Effect): [%]

### Secondary Metrics
- [Métrica 2]
- [Métrica 3]

### Guardrail Metrics
- [Não pode piorar mais que X%]

## 4. Segmentação
- Target audience: [todos / mobile / organic / etc]
- Sample size: [calculado]
- Duration: [dias]

## 5. Variantes
### Control
[Descrição do estado atual]

### Variant A
[Descrição da mudança]

### Variant B (se aplicável)
[Descrição da mudança alternativa]

## 6. Implementação
### Feature Flag
```typescript
const variant = AmplitudeExperiment.getVariant('experiment-[id]');
```

### Tracking Events
- [Eventos específicos a serem disparados]

## 7. Análise
### Statistical Significance
- Confidence level: 95%
- Minimum sample: [calculado]
- Expected duration: [dias]

### Success Criteria
- Primary metric atinge target: ✅
- Secondary metrics não degradam: ✅
- Guardrails respeitados: ✅

## 8. Next Steps
### Se bem-sucedido:
- [Ação 1]
- [Ação 2]

### Se não conclusivo:
- [Iteração sugerida]

### Se falhar:
- [Learnings e pivô]
```

---

Agora você tem base sólida para exercitar criação de planos de teste! 🚀