Feature: Experimentos e feature flags (opcional)
  Como time de growth/experimentation
  Quero validar atribuição e comportamento de variantes
  Para garantir regras de dedupe, reatribuição controlada e integridade das métricas

  # Incluir este arquivo apenas se o sistema de experiments/feature flags estiver presente
  @unit
  Scenario: Atribuição de variante determinística
    Given um usuário com id conhecido
    When a função de atribuição de variante é executada com a mesma seed
    Then a variante retornada deve ser determinística (mesmo id => mesma variante)

  @unit
  Scenario: Reatribuição controlada (ex.: mudança de rollout)
    Given que a regra de reatribuição permite mover usuários entre variantes
    When a regra é atualizada
    Then o sistema deve reatribuir somente os usuários elegíveis e registrar eventos de alteração

  @e2e
  Scenario: Experimento não deve afetar integridade dos eventos analytics
    Given um experimento ativo que altera UI
    When o usuário participa da variante experimental
    Then os eventos enviados para analytics devem conter metadata da variante sem duplicar eventos
