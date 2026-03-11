export type DocsHighlight = {
    title: string;
    description: string;
};

export type DocsSection = {
    id: string;
    title: string;
    summary: string;
    body: string[];
    bullets?: string[];
    diagram?: string;
    code?: {
        title: string;
        language: string;
        content: string;
    };
};

export const docsHighlights: DocsHighlight[] = [
    {
        title: 'Fonte de verdade',
        description:
            'A Conta Kattana centraliza credenciais, e-mail verificado, perfil básico e o identificador global do usuário.',
    },
    {
        title: 'Integração pragmática',
        description:
            'Os apps da suíte mantêm apenas vínculo local leve por uuid, sem recriar login ou senha por aplicação.',
    },
    {
        title: 'Arquitetura evolutiva',
        description:
            'A solução atual é simples e sólida, preparada para SSO mais robusto no futuro sem antecipar OAuth2 agora.',
    },
];

export const docsSections: DocsSection[] = [
    {
        id: 'overview',
        title: 'Visão geral',
        summary: 'O que é a Conta Kattana e por que ela existe.',
        body: [
            'A Conta Kattana, hospedada em conta.kattana.com.br, é a central de identidade global da suíte Kattana. Ela existe para garantir que o usuário tenha uma única conta confiável para autenticação e perfil básico, independentemente do app que estiver usando.',
            'Nesta primeira etapa, a arquitetura foi mantida intencionalmente enxuta: autenticação baseada em sessão do Laravel, Fortify para os fluxos de conta e um endpoint autenticado de identidade para leitura do usuário atual.',
        ],
        bullets: [
            'Cadastro, login, logout, reset de senha e verificação de e-mail ficam centralizados.',
            'O usuário global recebe um uuid estável para referência entre aplicações.',
            'Apps clientes continuam donos apenas dos seus dados de negócio.',
        ],
    },
    {
        id: 'account-concept',
        title: 'Conceito da Conta Kattana',
        summary: 'O papel do serviço dentro da suíte.',
        body: [
            'A Conta Kattana é a fonte de verdade da identidade. Isso significa que nome, e-mail, senha, status de verificação de e-mail e segurança de conta pertencem a este sistema, não aos apps consumidores.',
            'O app cliente pode ter uma representação local do usuário por conveniência operacional, mas não deve se comportar como autoridade de autenticação ou manter um conjunto paralelo de credenciais.',
        ],
        bullets: [
            'Identidade global: concentrada na Conta Kattana.',
            'Dados de domínio: permanecem em cada app consumidor.',
            'Integração futura: facilitada por uma referência pública estável por uuid.',
        ],
    },
    {
        id: 'global-uuid',
        title: 'Papel do uuid global',
        summary: 'Por que o uuid é o vínculo recomendado entre sistemas.',
        body: [
            'O uuid do usuário global foi adicionado para servir como identificador público estável entre aplicações da suíte. Ele evita dependência do id numérico interno da base da Conta Kattana e reduz acoplamento com detalhes de implementação.',
            'Ao integrar um novo app, o vínculo recomendado é sempre baseado no uuid global. Isso permite que o app cliente mantenha sua própria chave primária local sem abrir mão de uma referência clara para a identidade global.',
        ],
        bullets: [
            'O id local da Conta Kattana continua interno ao serviço.',
            'O uuid é o identificador recomendado para integrações e vínculos externos.',
            'O vínculo por uuid simplifica evolução futura para SSO mais robusto.',
        ],
    },
    {
        id: 'responsibilities',
        title: 'Responsabilidades do conta.kattana.com.br',
        summary: 'O que já faz parte do serviço central hoje.',
        body: [
            'A Conta Kattana já concentra os fluxos essenciais de autenticação e gestão da conta global do usuário.',
            'A documentação deve refletir o estado atual do sistema: não há OAuth2, Passport, consent screen, multi-tenant ou RBAC avançado nesta fase.',
        ],
        bullets: [
            'Gerenciar cadastro, login, logout e reset de senha.',
            'Concentrar o status de e-mail verificado.',
            'Permitir edição de perfil e alteração de senha.',
            'Expor a identidade autenticada com payload controlado em /api/me.',
        ],
    },
    {
        id: 'client-apps',
        title: 'O que fica no app cliente',
        summary: 'Separação entre identidade global e dados de negócio.',
        body: [
            'Cada app da suíte mantém seus próprios dados de domínio. No caso do Economizze, isso inclui contas, categorias, transações, metas, relatórios e toda a modelagem financeira.',
            'O app cliente pode manter uma tabela local leve de usuários para facilitar relacionamento com dados internos, preferências locais e auditoria, mas essa tabela não substitui a Conta Kattana.',
        ],
        bullets: [
            'O app cliente não deve armazenar senha própria separada.',
            'O app cliente pode guardar global_uuid, name e email como espelho operacional.',
            'Atualizações de identidade devem partir da Conta Kattana.',
        ],
    },
    {
        id: 'auth-flow',
        title: 'Fluxo de autenticação entre apps',
        summary: 'Como pensar o fluxo atual entre um app da suíte e a conta global.',
        body: [
            'Ainda não existe SSO enterprise completo entre subdomínios. O desenho atual é preparar a suíte para isso, sem antecipar camadas complexas antes da hora.',
            'Na prática, o app cliente deve redirecionar o usuário para autenticação na Conta Kattana quando precisar estabelecer a identidade global. Após a autenticação, o app cliente usa a identidade retornada pela Conta Kattana como base para criar ou localizar seu vínculo local.',
        ],
        diagram: [
            'Usuario',
            '  -> Economizze solicita identidade',
            '  -> Conta Kattana autentica o usuario',
            '  -> Economizze consulta a identidade autenticada',
            '  -> Economizze localiza ou cria o usuario local via global_uuid',
            '  -> Economizze libera acesso aos dados financeiros locais',
        ].join('\n'),
    },
    {
        id: 'api-me',
        title: 'Endpoint de identidade (/api/me)',
        summary: 'A leitura canônica da identidade autenticada.',
        body: [
            'O endpoint autenticado /api/me existe para retornar apenas os dados essenciais do usuário global atualmente autenticado. Ele é o ponto de leitura mais importante para integração entre a Conta Kattana e os apps da suíte.',
            'A ideia do endpoint não é transportar dados de domínio dos outros apps, mas informar quem é o usuário autenticado segundo a fonte de verdade da suíte.',
        ],
        bullets: [
            'Use /api/me quando o app cliente precisar confirmar a identidade global do usuário logado.',
            'O retorno atual é mínimo e consistente: uuid, name, email, email_verified e created_at.',
            'O endpoint existe para leitura da identidade, não para sincronização massiva de dados.',
        ],
        code: {
            title: 'Exemplo de resposta',
            language: 'json',
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
        id: 'local-linking',
        title: 'Estratégia recomendada de vínculo local',
        summary: 'Como mapear o usuário global dentro de outro app Laravel.',
        body: [
            'A recomendação é que cada app consumidor tenha uma tabela local de usuários vinculados ao usuário global por global_uuid. Essa tabela pode espelhar alguns campos da identidade para uso interno, sem tomar posse da autenticação.',
            'Isso simplifica relacionamentos locais, auditoria, permissões específicas do app e expansão futura do domínio, sem misturar responsabilidades entre sistemas.',
        ],
        code: {
            title: 'Exemplo de estrutura local no app cliente',
            language: 'text',
            content: `users
- id
- global_uuid
- name
- email
- onboarding_completed_at
- last_seen_at
- created_at
- updated_at`,
        },
        bullets: [
            'global_uuid deve ser único no app cliente.',
            'name e email podem ser espelhados para conveniência operacional.',
            'Relacionamentos de negócio do app cliente devem apontar para o usuário local.',
        ],
    },
    {
        id: 'economizze',
        title: 'Exemplo prático com o Economizze',
        summary: 'Como o primeiro app da suíte deve consumir a Conta Kattana.',
        body: [
            'No Economizze, a Conta Kattana será a base da identidade do usuário. O Economizze não deve criar uma pilha paralela de login e senha; ele deve confiar na identidade global e cuidar apenas do domínio financeiro.',
            'O usuário do Economizze deve ser ligado ao usuário global por global_uuid. A partir desse vínculo, contas financeiras, lançamentos, categorias, orçamentos e demais dados continuam integralmente locais ao Economizze.',
        ],
        diagram: [
            'Conta Kattana',
            '  - uuid global',
            '  - name',
            '  - email',
            '  - email_verified',
            '',
            'Economizze',
            '  - user.id local',
            '  - user.global_uuid',
            '  - preferencias locais',
            '  - dados financeiros do dominio',
        ].join('\n'),
        bullets: [
            'Cenário: o usuário acessa o Economizze pela primeira vez.',
            'Objetivo: localizar ou criar o usuário local com base na identidade global.',
            'Resultado: o vínculo local habilita o acesso aos dados financeiros sem duplicar credenciais.',
        ],
    },
    {
        id: 'decisions',
        title: 'Decisões arquiteturais e por quê',
        summary: 'O racional por trás da solução atual.',
        body: [
            'A suíte ainda está no início da integração entre apps. Por isso, a arquitetura atual prioriza baixo atrito operacional, clareza de responsabilidade e facilidade de evolução.',
            'A opção foi não introduzir OAuth2, Passport, consent screen, multi-tenant ou um IdP enterprise completo nesta etapa, porque isso aumentaria a complexidade antes de haver necessidade real comprovada.',
        ],
        bullets: [
            'Fortify e sessão do Laravel atendem bem a fase atual.',
            'uuid global prepara o terreno para confiança entre apps.',
            'Payload enxuto em /api/me reduz acoplamento e deixa a integração objetiva.',
        ],
    },
    {
        id: 'next-steps',
        title: 'Próximos passos e evolução futura',
        summary: 'Como essa base pode evoluir sem ruptura.',
        body: [
            'Quando houver necessidade real de autenticação compartilhada entre múltiplos apps e domínios com menos fricção, a Conta Kattana já terá uma base clara para evoluir.',
            'Os próximos passos naturais podem incluir uma estratégia formal de handoff de autenticação entre aplicações, endurecimento adicional de segurança e um contrato mais explícito de integração para clientes internos.',
        ],
        bullets: [
            'Formalizar o fluxo do primeiro consumidor real, o Economizze.',
            'Definir contrato de integração entre apps da suíte.',
            'Avaliar SSO/OAuth2 apenas quando a operação exigir isso de fato.',
        ],
    },
];
