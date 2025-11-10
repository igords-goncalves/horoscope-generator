Feature: Fluxos End-to-End (E2E)
	Como usuário final
	Quero validar o fluxo completo da aplicação
	Para garantir que a experiência funcione em produção

	@e2e
	Scenario: Fluxo principal - inserir data e ver resultado
		Given que eu acesso a página inicial
		When eu preencho o campo de data com "1990-04-15" e clico em "Consultar"
		Then eu devo ver o resultado do signo na tela com nome, descrição e imagem

	@e2e
	Scenario: Tratamento de erros no fluxo E2E
		Given que eu acesso a página inicial
		When eu preencho o campo de data com "31-02-2020" e clico em "Consultar"
		Then eu devo ver uma mensagem de erro clara para o usuário

	@e2e
	Scenario: Interceptar e validar eventos de analytics durante E2E
		Given eu intercepto as chamadas para o endpoint de analytics (Amplitude/GA)
		When eu realizo uma consulta válida
		Then a requisição de analytics deve ser enviada com um payload contendo chave "event_name" igual a "horoscope_view"

	@e2e
	Scenario: Responsividade – comportamento mobile vs desktop
		Given a aplicação carregada em viewport mobile (<= 480px)
		When eu realizo uma consulta válida
		Then o layout deve exibir imagem e texto empilhados (mobile)

	@e2e
	Scenario: Acessibilidade básica no fluxo E2E
		Given a aplicação carregada
		When eu realizo o fluxo principal
		Then os principais elementos interativos devem ser acessíveis via teclado

