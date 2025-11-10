Feature: Instrumentação e Analytics
	Como equipe de produto
	Quero que eventos relevantes sejam disparados com payloads consistentes
	Para analisar comportamento e conversão (Amplitude / GA4)

	@e2e
	Scenario: Evento de visualização de horóscopo (horoscope_view)
		Given que o sistema de analytics está sendo interceptado
		When o usuário realiza uma consulta válida com a data "1990-04-15"
		Then deve ser enviado um evento com o nome "horoscope_view"
		And o payload deve conter pelo menos as chaves:
			| key    | expected         |
			| sign   | Aries            |
			| source | ui               |

	@e2e
	Scenario: Evento de tentativa de compartilhamento (share_attempt)
		Given que o usuário visualizou o resultado de um signo
		When ele clica em "Compartilhar"
		Then deve ser enviado um evento "share_attempt" contendo {"sign": "Aries", "method": "share_button"}

	@e2e
	Scenario: Erro de validação não deve disparar evento de consulta
		Given que o usuário insere um valor inválido no formulário
		When o usuário submete o formulário
		Then nenhum evento "horoscope_view" deve ser enviado

	@unit
	Scenario: Payload mínimo e contrato de evento
		Given o helper que forma o payload de analytics
		When ele recebe os dados do signo e contexto
		Then deve retornar um objeto contendo event_name, sign, source e timestamp

