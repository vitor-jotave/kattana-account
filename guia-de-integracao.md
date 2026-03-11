# Guia de Integracao com a Conta Kattana

Este arquivo e um briefing objetivo para um agente de IA integrar um app da suite Kattana, como o Economizze, com a Conta Kattana.

O foco aqui e somente a integracao do app cliente.

## Regra principal

```text
Conta Kattana = identidade global
App cliente = dados do produto
Vinculo = uuid/global_uuid
```

## O que a Conta Kattana ja oferece

A Conta Kattana ja e a fonte de verdade para:

- autenticacao
- credenciais
- e-mail verificado
- nome
- e-mail
- identificador global estavel do usuario

O identificador oficial entre apps e o `uuid`.

## O que o app cliente deve fazer

No app cliente:

- nao criar login separado
- nao criar senha separada
- nao tratar o app como autoridade de identidade
- manter um usuario local leve vinculado por `global_uuid`
- manter todo o dominio do produto localmente

## Protocolo real de integracao

Hoje a integracao correta nao e chamar `GET /api/me` diretamente no browser do app cliente.

O fluxo real agora e em 2 passos:

1. browser do usuario vai para a rota de launch da Conta Kattana
2. backend do app cliente troca o `code` por identidade no endpoint server-to-server

## Passo 1: launch no browser

Rota:

```text
GET /apps/{app}/launch?return_to={url-absoluta}
```

Exemplo para o Economizze:

```text
GET https://conta.kattana.com.br/apps/economizze/launch?return_to=https%3A%2F%2Feconomizze.seudominio.com%2Fauth%2Fcallback
```

Comportamento:

- exige usuario autenticado na Conta Kattana
- se o usuario nao estiver logado, a Conta Kattana manda para login e depois continua o fluxo
- valida `return_to` por allowlist
- gera um `code` de uso unico com expiracao curta
- redireciona o browser para:

```text
{return_to}?code=...
```

Entao o app cliente deve iniciar o fluxo mandando o usuario para essa URL.

## Passo 2: exchange server-to-server

Quando o app cliente receber `code` no callback, o backend dele deve trocar esse `code` por identidade.

Endpoint:

```text
POST /api/integrations/apps/{app}/exchange
```

Exemplo:

```text
POST https://conta.kattana.com.br/api/integrations/apps/economizze/exchange
```

Autenticacao do app:

- HTTP Basic
- username = `ECONOMIZZE_APP_KEY`
- password = `ECONOMIZZE_APP_SECRET`

Body:

```json
{
  "code": "..."
}
```

Resposta esperada:

```json
{
  "data": {
    "uuid": "3fd15374-2f25-4c8c-a991-6c41f0aab8a4",
    "name": "Joao Silva",
    "email": "joao@kattana.com.br",
    "email_verified": true,
    "created_at": "2026-03-11T17:24:53+00:00"
  }
}
```

## Como o Economizze deve implementar

Fluxo recomendado:

1. usuario clica em entrar no Economizze
2. Economizze redireciona o browser para `conta/.../apps/economizze/launch`
3. Conta Kattana autentica o usuario e redireciona de volta para o callback do Economizze com `code`
4. backend do Economizze chama o endpoint de exchange com HTTP Basic
5. backend do Economizze recebe a identidade
6. Economizze localiza ou cria o usuario local por `global_uuid`
7. Economizze cria a sessao local do produto

Diagrama:

```text
Usuario
  -> Economizze
  -> Conta Kattana /apps/economizze/launch
  -> callback do Economizze com code
  -> backend do Economizze faz exchange
  -> Conta Kattana retorna identidade
  -> Economizze cria/recupera usuario local
  -> Economizze autentica o usuario localmente
```

## Modelagem recomendada no app cliente

Tabela local minima:

```text
users
- id
- global_uuid
- name
- email
- created_at
- updated_at
```

Regras:

- `global_uuid` deve ser unico
- o usuario local pode ter `id` proprio
- relacionamentos do dominio devem apontar para o usuario local
- `name` e `email` podem ser espelhados localmente

## Pseudocodigo do callback no app cliente

```text
code = request('code')

identity = exchangeCodeWithContaKattana(code)

user = User::query()->firstOrCreate(
  ['global_uuid' => identity.uuid],
  [
    'name' => identity.name,
    'email' => identity.email,
  ]
)

atualizar user.name e user.email se necessario

autenticar usuario local no app cliente

redirecionar para area autenticada do produto
```

## O que o app cliente precisa configurar

No app cliente, voce precisa conhecer:

- URL base da Conta Kattana
- `app_slug` do cliente, por exemplo `economizze`
- callback URL do cliente
- `app_key`
- `app_secret`

No caso do Economizze, o backend deve guardar `app_key` e `app_secret` como segredo de servidor.

## Quando usar GET /api/me

`GET /api/me` continua existindo, mas o uso principal dele e leitura da identidade autenticada dentro da propria Conta Kattana ou em contextos em que a sessao da Conta Kattana ja esta estabelecida e controlada.

Para integracao entre apps, o fluxo recomendado agora e:

```text
launch -> code -> exchange
```

Nao monte a integracao principal do app cliente assumindo acesso direto a `/api/me` no browser.

## Logout entre apps

O logout entre apps deve passar pela Conta Kattana para encerrar a sessao central.

Rota:

```text
GET /apps/{app}/logout?return_to={url-absoluta}
```

Exemplo:

```text
GET https://conta.kattana.com.br/apps/economizze/logout?return_to=https%3A%2F%2Feconomizze.seudominio.com%2Flogout%2Fcallback
```

Comportamento:

- valida `return_to` pela mesma allowlist do app
- encerra a sessao web da Conta Kattana se existir
- invalida a sessao
- redireciona o browser de volta para `return_to`

Fluxo recomendado no app cliente:

1. usuario aciona logout no app cliente
2. app cliente limpa ou prepara o encerramento da sessao local
3. browser vai para `/apps/economizze/logout?return_to=...`
4. Conta Kattana encerra a sessao central
5. browser volta para o callback/logout final do app cliente
6. app cliente conclui o logout local e redireciona para a tela publica desejada

## Falhas esperadas

O app cliente deve tratar pelo menos:

- `code` invalido
- `code` expirado
- `code` ja usado
- app nao autorizado
- `return_to` nao permitido

Nao tente contornar isso no cliente. Trate como falha normal de autenticacao/integracao.

## O que nao fazer

Nao implemente no app cliente:

- cadastro de senha separado
- recuperacao de senha separada
- tabela de credenciais paralela
- outra fonte de verdade para identidade
- integracao baseada no `id` interno da Conta Kattana
- OAuth2/Passport/OIDC sem necessidade real do projeto

## Instrucao curta para outro agente

Se voce estiver implementando isso no Economizze, faca assim:

1. redirecione o usuario para `/apps/economizze/launch`
2. receba `code` no callback do Economizze
3. troque `code` por identidade via `POST /api/integrations/apps/economizze/exchange`
4. autentique o app com HTTP Basic usando `app_key` e `app_secret`
5. vincule ou crie o usuario local por `global_uuid`
6. autentique localmente o usuario no Economizze
