# Conceito do Site - v1.0.0

O site é um gerador de signos baseado na data de nascimento do usuário. Ao inserir sua data de nascimento, o usuário poderá consultar seu signo astrológico, ver as características associadas a ele e visualizar uma imagem representativa do signo.

---

## Objetivo

Criar um site onde os usuários possam:

- Consultar seu signo baseado na data de nascimento;
- Ver as características associadas ao signo;
- Ver a imagem representativa do signo;

Todos esses processos devem ser trackeados usando Google Analytics 4 (GA4) e GTM, Amplitude e Hotjar para análise de comportamento do usuário e otimização da experiência, retenção, engajamento e conversão.

A ideia é que o site esteja pronto para criação de experimentos, testes A/B e análise de funil de conversão, com suporte a feature flags.

> Uma conversão bem sucedida seria o usuário consultar seu signo e compartilhar o resultado em redes sociais.

---

## Critérios de Aceitação

- [ ] O site não precisa de um sistema de autenticação de usuários.
- [ ] Todo o site pode ser feito em uma única página.
- [ ] Deve ter integração com ferramentas de análise para monitoramento de comportamento do usuário.
- [ ] Foco na experiência do usuário e na facilidade de navegação.
- [ ] Deve ser possível consultar o signo em diferentes datas de nascimento.

---

## Funcionalidades Principais

### 1. Página Inicial

- Campo para inserção da data de nascimento.
- Botão para submeter a consulta do signo.
- Exibição do signo correspondente, suas características(nome, significado) e imagem representativa após a consulta.
- Tratamento de erros para datas inválidas ou vazias.

### 2. Rastreamento e Análise

- Integração com Google Analytics 4 (GA4) e Google Tag Manager (GTM) para monitoramento de eventos.
- Coleta de dados de comportamento do usuário com Amplitude.
- Gravação de sessões e mapas de calor com Hotjar.

### 3. Responsividade

- Design responsivo para dispositivos móveis e desktops.
- Testes de usabilidade em diferentes tamanhos de tela.
- Otimização de desempenho para carregamento rápido em todas as plataformas.

### 4. Segurança

- Implementação de HTTPS para segurança de dados.
- Proteção contra ataques comuns (XSS, CSRF, etc.).
- Conformidade com regulamentos de privacidade (GDPR, CCPA).

---

## Adicionais

Toda API de consulta dos signos foi feita dentro do próprio front-end, sem necessidade de backend, utilizando as funcionalidades do Next.js para isso.

## Modelo de dados (mockup)

Produtos:

```json

```

---

# Implementações Futuras

- Adicionar compartilhamento em redes sociais.