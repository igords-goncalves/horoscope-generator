Feature: Acessibilidade (a11y)
	Como equipe de UX/QA
	Quero garantir que a interface seja navegável e utilizável por todos
	Para cumprir requisitos de acessibilidade e boas práticas

	@accessibility @unit
	Scenario: Inputs possuem labels e atributos ARIA
		Given a página inicial carregada
		Then todos os campos de input devem ter um label associado
		And elementos que mudam dinamicamente devem expor atributos aria-live quando aplicável

	@accessibility @e2e
	Scenario: Ordem de foco e navegação por teclado
		Given a página inicial carregada
		When o usuário navega usando TAB
		Then a ordem de foco deve seguir a ordem lógica do conteúdo
		And o botão "Consultar" deve ser acionável por teclado (Enter/Space)

	@accessibility @unit
	Scenario: Contraste de cores mínimo (AA)
		Given os estilos carregados
		Then os elementos de texto principal e botões devem atender ao contraste mínimo AA

	@accessibility @e2e
	Scenario: Teste automático de acessibilidade (axe)
		Given a página carregada
		When eu executo a checagem automática de a11y
		Then não devem existir violações bloqueantes (critical/serious) relacionadas a labels, roles e contraste

