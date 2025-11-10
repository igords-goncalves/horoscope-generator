Feature: Segurança client-side
  Como time de segurança
  Quero garantir que inputs e renderizações não introduzam vulnerabilidades (XSS)
  Para proteger usuários e reduzir risco de execução de script malicioso

  @unit
  Scenario: Sanitização de entradas antes de renderizar texto dinâmico
    Given um input do usuário contendo caracteres especiais/HTML
    When o texto é exibido na UI (ex.: descrição personalizada)
    Then o renderer deve escapar/sanitizar o conteúdo para evitar execução de código

  @e2e @security
  Scenario: Tentativa de XSS via campo de data (ou campos abertos)
    Given uma payload maliciosa (ex.: "<img src=x onerror=alert(1)>")
    When a payload é submetida e eventualmente renderizada
    Then não deve haver execução de scripts ou alertas; o DOM deve conter texto escapado

  @unit
  Scenario: Limite e validação de tamanho de input
    Given que o usuário insere inputs muito longos (fuzz)
    When o formulário é submetido
    Then o input deve ser truncado/validado e não causar overflow ou crash no componente
