export type DocsKind = 'Overview' | 'How-to' | 'Reference' | 'Explanation';

export type DocsSection = {
    id: string;
    kind: DocsKind;
    title: string;
    summary: string;
    body: string[];
    bullets?: string[];
    diagram?: string;
    code?: {
        title: string;
        content: string;
    };
};

export const docsSections: DocsSection[] = [
    {
        id: 'overview',
        kind: 'Overview',
        title: 'Conta Kattana em uma frase',
        summary: 'A fonte de verdade da identidade global da suite.',
        body: [
            'A Conta Kattana concentra autenticacao, credenciais, e-mail verificado, perfil basico e o identificador global do usuario.',
            'Os apps da suite, como o Economizze, devem confiar nessa identidade e manter apenas seus dados de produto e uma representacao local leve do usuario quando necessario.',
        ],
        bullets: [
            'Nao duplicar login e senha no app cliente.',
            'Usar uuid como vinculo global entre sistemas.',
            'Tratar /api/me como leitura canonica da identidade autenticada.',
        ],
    },
    {
        id: 'how-to-integrate',
        kind: 'How-to',
        title: 'Como integrar um app da suite',
        summary: 'Fluxo minimo para implementar a integracao sem overengineering.',
        body: [
            'A integracao deve partir de uma regra simples: Conta Kattana cuida da identidade; o app cliente cuida do seu dominio.',
            'Quando o app cliente precisar estabelecer quem e o usuario, ele deve obter a identidade autenticada, localizar ou criar o usuario local por global_uuid e seguir com o fluxo normal do produto.',
        ],
        bullets: [
            'Obter a identidade autenticada.',
            'Ler data.uuid.',
            'Buscar usuario local por global_uuid.',
            'Criar usuario local se ainda nao existir.',
            'Relacionar o dominio do app ao usuario local.',
        ],
        diagram: [
            'Usuario',
            '  -> app cliente precisa identificar o usuario',
            '  -> Conta Kattana confirma a identidade',
            '  -> app cliente le /api/me',
            '  -> app cliente localiza ou cria user por global_uuid',
            '  -> app cliente libera acesso ao dominio local',
        ].join('\n'),
    },
    {
        id: 'how-to-economizze',
        kind: 'How-to',
        title: 'Como pensar isso no Economizze',
        summary: 'Exemplo concreto para o primeiro consumidor da suite.',
        body: [
            'No Economizze, a Conta Kattana deve ser a autoridade de identidade. O Economizze nao deve manter credenciais proprias separadas.',
            'O usuario local do Economizze existe para se relacionar com contas, transacoes, categorias, metas, relatorios e preferencias do produto.',
        ],
        bullets: [
            'Conta Kattana define quem e o usuario.',
            'Economizze define quais dados financeiros pertencem a ele.',
            'O vinculo entre os dois acontece por global_uuid.',
        ],
        diagram: [
            'Conta Kattana',
            '  - uuid',
            '  - name',
            '  - email',
            '',
            'Economizze',
            '  - users.id local',
            '  - users.global_uuid',
            '  - dados financeiros',
        ].join('\n'),
    },
    {
        id: 'reference-api',
        kind: 'Reference',
        title: 'Referencia: endpoint de identidade',
        summary: 'Contrato atual para leitura do usuario autenticado.',
        body: [
            'O contrato atual de integracao e GET /api/me.',
            'Esse endpoint retorna apenas os campos essenciais para o app cliente saber quem e o usuario autenticado segundo a Conta Kattana.',
        ],
        bullets: [
            'Usar para identificar o usuario global atual.',
            'Nao usar para carregar dados de negocio.',
            'Payload atual: uuid, name, email, email_verified e created_at.',
        ],
        code: {
            title: 'GET /api/me',
            content: `{
  "data": {
    "uuid": "3fd15374-2f25-4c8c-a991-6c41f0aab8a4",
    "name": "Joao Silva",
    "email": "joao@kattana.com.br",
    "email_verified": true,
    "created_at": "2026-03-11T17:24:53+00:00"
  }
}`,
        },
    },
    {
        id: 'reference-local-user',
        kind: 'Reference',
        title: 'Referencia: modelagem local recomendada',
        summary: 'Estrutura minima para representar o usuario no app cliente.',
        body: [
            'O app cliente pode manter uma tabela local leve de usuarios. Ela existe para suportar relacionamentos internos e operacao do produto, nao para substituir a Conta Kattana.',
            'O campo mais importante dessa modelagem e global_uuid, que deve ser unico.',
        ],
        code: {
            title: 'Tabela users no app cliente',
            content: `users
- id
- global_uuid
- name
- email
- created_at
- updated_at`,
        },
        bullets: [
            'Relacionamentos do dominio devem apontar para o user local.',
            'name e email podem ser espelhados localmente.',
            'Nao usar o id numerico da Conta Kattana como chave publica.',
        ],
    },
    {
        id: 'explanation-decisions',
        kind: 'Explanation',
        title: 'Decisoes arquiteturais atuais',
        summary: 'O que foi escolhido agora e o que ficou explicitamente fora do escopo.',
        body: [
            'A arquitetura atual foi mantida enxuta de proposito. A prioridade e fazer a suite compartilhar a identidade de forma clara e previsivel antes de introduzir um IdP completo.',
            'Por isso, esta fase nao inclui OAuth2, Passport, OIDC, consent screen, multi-tenant ou RBAC avancado. Se voce estiver integrando um app cliente agora, nao tente antecipar essas camadas.',
        ],
        bullets: [
            'A Conta Kattana ja resolve o basico necessario para identidade global.',
            'uuid reduz acoplamento entre apps.',
            'A simplicidade atual deixa a evolucao futura mais segura.',
        ],
    },
];
