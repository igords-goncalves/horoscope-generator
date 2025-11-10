Feature: Persistência e sincronização
  Como produto
  Quero que o estado relevante seja persistido e sincronizado entre abas
  Para melhorar a experiência do usuário e evitar perda de dados

  @unit
  Scenario: Salvar última data consultada em localStorage
    Given que o usuário submeteu uma consulta válida
    When o sistema salva o estado localmente
    Then o helper de persistência deve escrever a chave "last_birthday" em localStorage com valor formatado

  @e2e
  Scenario: Sincronização entre abas quando localStorage é atualizado
    Given que a aplicação está aberta em duas abas
    When o usuário atualiza a data em uma aba e salva
    Then a outra aba deve receber o evento de storage e atualizar a UI com a nova data/resultado

  @unit
  Scenario: Fallback quando storage indisponível (private mode)
    Given que localStorage não está disponível (throws)
    When o helper de persistência tenta salvar
    Then ele deve usar um fallback em memória e não quebrar a aplicação

  @e2e
  Scenario: Limpeza de estado ao clicar em "Limpar" ou novo cálculo
    Given que há um valor salvo em storage
    When o usuário limpa o formulário ou realiza nova consulta clara
    Then o valor salvo deve ser removido do localStorage
