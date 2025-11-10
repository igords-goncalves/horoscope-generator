Feature: Consulta de signo
	Como usuário
	Eu quero inserir minha data de nascimento
	Para ver meu signo, suas características e imagem representativa

	# Cenários que podem ser convertidos tanto em testes unitários (Jest) quanto em E2E (Cypress)
	@unit
	Scenario: Consulta válida com data completa
		Given que eu estou na página inicial
		And o campo de data de nascimento está visível
		When eu insiro "1990-04-15" no campo de data e clico em "Consultar"
		Then eu devo ver o nome do signo "Áries"
		And devo ver a descrição/características do signo
		And devo ver a imagem representativa do signo
		And um evento de analytics "horoscope_view" deve ser disparado com payload contendo {"sign":"Aries","source":"ui"}

	@e2e
	Scenario: Data inválida (formato incorreto)
		Given que eu estou na página inicial
		When eu insiro "15/04/1990" no campo de data e clico em "Consultar"
		Then eu devo ver uma mensagem de erro visível contendo "Data inválida"
		And nenhum evento de consulta deve ser enviado para analytics

	@unit
	Scenario: Campo vazio
		Given que eu estou na página inicial
		When eu deixo o campo de data vazio e clico em "Consultar"
		Then eu devo ver uma mensagem de validação "Por favor informe sua data de nascimento"

	@e2e
	Scenario: Compartilhamento do resultado
		Given que eu consultei com sucesso e vejo o resultado do signo
		When eu clico no botão "Compartilhar"
		Then deve abrir o modal de compartilhamento
		And um evento "share_attempt" deve ser enviado para analytics

	@e2e
	Scenario: Submissões rápidas devem ser debounced/lockadas
		Given que eu estou na página inicial
		When eu clico repetidamente no botão "Consultar" várias vezes rapidamente
		Then deve ser processada apenas uma solicitação de consulta
		And não devem ser disparados eventos analytics duplicados

	@unit @accessibility
	Scenario: Indicador de carregamento e foco após resposta
		Given que eu submeti uma consulta válida
		Then deve aparecer um indicador de loading (IsLoadingContext)
		And após a resposta o foco deve ser direcionado para o resultado (para facilitar navegação por teclado)

