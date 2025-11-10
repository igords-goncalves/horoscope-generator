Feature: Comportamento Offline
  Como produto
  Quero que eventos e requisições sejam enfileirados quando o usuário estiver offline
  Para não perder dados de analytics e garantir entregabilidade quando a conexão voltar

  @unit
  Scenario: Enfileirar evento de analytics quando offline
    Given que a aplicação detectou que está offline
    When um evento analytics é disparado pelo usuário
    Then o evento deve ser adicionado a uma fila persistente local (ex.: IndexedDB/localForage)

  @e2e
  Scenario: Retry/Backoff ao reconectar
    Given que existem eventos enfileirados devido a um período offline
    When a conexão é restabelecida
    Then os eventos devem ser enviados com retry/backoff controlado
    And eventos enviados com sucesso devem ser removidos da fila

  @e2e
  Scenario: Indicador de estado offline para o usuário
    Given que a aplicação está offline
    Then a UI deve mostrar um indicador discreto informando que eventos serão enfileirados
