Feature: Performance básica
  Como time de produto
  Quero garantir que o carregamento e a interação sejam rápidos em condições adversas
  Para melhorar a experiência e reduzir churn

  @e2e @performance
  Scenario: Imagem do signo deve lazy-loadar e exibir placeholder
    Given que o usuário consulta um signo
    When o componente de imagem é renderizado
    Then a imagem deve exibir um placeholder enquanto carrega
    And o recurso de lazy-loading deve evitar fetch se a imagem não estiver no viewport

  @e2e
  Scenario: Fluxo principal sob rede lenta (throttling)
    Given a página carregada com network throttling (ex.: 3G)
    When o usuário submete a consulta
    Then a UI deve exibir um loading state e completar o fluxo dentro de limite aceitável (ex.: 5s)

  @unit
  Scenario: Placeholder e skeleton renderizam rapidamente
    Given o componente de resultado montado
    Then os placeholders/skeletons devem renderizar sem bloqueio de layout
