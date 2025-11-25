# Inventário de Problemas - Horoscope Generator
## Data: Janeiro 2025

Este documento cataloga problemas identificados através de análise de dados (fictícios) que justificam a criação de hipóteses e planos de teste.

---

## P1: Alta Taxa de Abandono no Formulário
**Severidade:** 🔴 Crítica  
**Impacto estimado:** 6.800 usuários/mês perdidos

### Métricas-chave
- Abandonment Rate: 68%
- Final Conversion Rate: 31.5%
- Avg. Time on Form: 12s

### Segmentos afetados
- Mobile: 78% do abandono
- Primeira visita: 82%

### Hipóteses para teste
1. **H1:** Adicionar placeholder com exemplo de formato aumentará `Date Selected` em 15%
2. **H2:** Implementar date picker visual (calendário) reduzirá abandono em 20%
3. **H3:** Melhorar mensagens de erro aumentará retry rate de 18% → 35%

---

## P2: Baixo Engajamento com Compartilhamento
**Severidade:** 🟡 Alta  
**Impacto estimado:** Perda de 150+ shares/mês (viralização)

### Métricas-chave
- Share rate: 4% (target: 12%)
- Click-to-share conversion: 22.4%

### Hipóteses para teste
1. **H1:** Reposicionar botão de share acima da fold aumentará cliques em 30%
2. **H2:** Adicionar toast confirmation aumentará completion em 40%
3. **H3:** Pre-popular mensagem de share aumentará conversão em 25%

---

## P3: Degradação de Performance
**Severidade:** 🔴 Crítica  
**Impacto estimado:** 22% de abandono em horários de pico

### Métricas-chave
- P95 latency: 3.8s (target: <2s)
- LCP: 2.8s (target: <2.5s)

### Hipóteses para teste
1. **H1:** Lazy-load de analytics reduzirá FID em 60%
2. **H2:** Otimizar SVGs reduzirá LCP para <2s
3. **H3:** Skeleton loading reduzirá perceived latency

---

## P4: Confusão com Signos de Cúspide
**Severidade:** 🟡 Média  
**Impacto estimado:** 8.4% de reconsultas desnecessárias

### Métricas-chave
- Re-engagement rate: 8.4%
- High-friction dates: 20-21 of each month

### Hipóteses para teste
1. **H1:** Tooltip explicativo reduzirá reconsultas em 50%
2. **H2:** Input de hora de nascimento aumentará confiança em 30%
3. **H3:** Disclaimer sobre cúspides reduzirá confusão

---

## P5: Baixa Retenção Orgânica
**Severidade:** 🟠 Alta  
**Impacto estimado:** LTV 3x menor vs outras fontes

### Métricas-chave
- Return rate D7: 12% (vs 28% paid)
- Avg sessions: 1.2 (vs 2.4 paid)

### Hipóteses para teste
1. **H1:** Prompt "Salvar resultado" aumentará return rate em 25%
2. **H2:** Email reminder semanal ("horóscopo da semana") aumentará retention
3. **H3:** Gamificação (coletar todos os 12 signos) aumentará sessions

---

## Priorização (Framework ICE)

| Problema | Impact | Confidence | Ease | Score |
|----------|--------|------------|------|-------|
| P1       | 9      | 8          | 7    | 8.0   |
| P3       | 8      | 9          | 6    | 7.7   |
| P2       | 7      | 7          | 8    | 7.3   |
| P5       | 8      | 6          | 4    | 6.0   |
| P4       | 5      | 7          | 7    | 6.3   |

**Recomendação:** Começar por P1 (formulário) → P3 (performance) → P2 (share)