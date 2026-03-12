import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { docs } from '@/routes';
import { edit as profileEdit } from '@/routes/profile';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 pb-10 pt-2">
                <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
                    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(223,255,79,0.13),_transparent_34%),radial-gradient(circle_at_80%_18%,rgba(72,255,167,0.08),_transparent_22%),linear-gradient(180deg,rgba(20,20,20,0.96),rgba(7,7,7,0.96))] p-7 text-white shadow-[0_30px_90px_rgba(0,0,0,0.36)] sm:p-8">
                        <div className="flex h-full flex-col justify-between gap-10">
                            <div className="space-y-5">
                                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                                    <img
                                        src="/images/logo-site.png"
                                        alt="Kattana"
                                        className="h-6 w-auto"
                                    />
                                    <span className="text-xs uppercase tracking-[0.24em] text-zinc-300">
                                        Conta global da suite
                                    </span>
                                </div>

                                <div className="max-w-3xl space-y-4">
                                    <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                                        O centro de controle da sua conta Kattana.
                                    </h1>
                                    <p className="max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                                        Tudo o que define a identidade global do usuario
                                        continua centralizado aqui: acesso, verificacao de
                                        e-mail, seguranca da conta e o ponto de integracao
                                        com os apps da suite.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <LinkButton href={profileEdit()} label="Ajustar perfil" />
                                <LinkButton href={docs()} label="Ler documentacao" secondary />
                            </div>
                        </div>
                    </article>

                    <div className="grid gap-4">
                        <article className="rounded-[2rem] border border-white/10 bg-[#dfff4f] p-6 text-black">
                            <p className="text-xs uppercase tracking-[0.22em] text-black/60">
                                Integracao
                            </p>
                            <h2 className="mt-4 text-2xl font-semibold">
                                Handoff pronto para os apps da Kattana
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-black/70">
                                Launch, exchange, allowlist de retorno e identidade
                                padronizada ja fazem parte da base.
                            </p>
                        </article>

                        <article className="rounded-[2rem] border border-white/10 bg-[#0e0e0e] p-6 text-white">
                            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                                Estado atual
                            </p>
                            <div className="mt-5 space-y-4">
                                {[
                                    'UUID global como identificador oficial entre apps',
                                    'Login, cadastro e reset de senha centralizados',
                                    'Verificacao de e-mail e 2FA dentro da Conta Kattana',
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-zinc-300"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </article>
                    </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <DashboardPanel
                        eyebrow="Identidade"
                        title="A fonte de verdade continua aqui"
                        description="O app cliente pode ter um vinculo local leve, mas nome, e-mail, credenciais e verificacao continuam sendo responsabilidade da Conta Kattana."
                    />
                    <DashboardPanel
                        eyebrow="Seguranca"
                        title="Fluxos consolidados em um unico lugar"
                        description="Alteracao de senha, confirmacao de senha sensivel, verificacao de e-mail e autenticacao em dois fatores seguem no mesmo produto."
                    />
                    <DashboardPanel
                        eyebrow="Operacao"
                        title="Uma base simples para crescer com a suite"
                        description="A arquitetura atual evita overengineering, mas ja organiza o terreno para integrar Economizze e os proximos apps sem duplicar identidade."
                    />
                </section>

                <section className="rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-6 text-white sm:p-8">
                    <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
                        <div className="space-y-4">
                            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                                Painel interno
                            </p>
                            <h2 className="text-3xl font-semibold tracking-tight">
                                O que voce gerencia por aqui
                            </h2>
                            <p className="max-w-xl text-sm leading-7 text-zinc-400">
                                Esse painel nao tenta ser um hub inflado. Ele concentra
                                apenas o que realmente importa para a conta global:
                                identidade, seguranca e a base de integracao entre apps.
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {[
                                {
                                    title: 'Perfil global',
                                    description:
                                        'Atualize nome, e-mail e acompanhe o identificador oficial da conta.',
                                },
                                {
                                    title: 'Senha e acesso',
                                    description:
                                        'Gerencie credenciais, redefinicao e confirmacoes sensiveis.',
                                },
                                {
                                    title: 'Integracao de apps',
                                    description:
                                        'Use launch, exchange e o payload padrao de identidade.',
                                },
                                {
                                    title: 'Documentacao viva',
                                    description:
                                        'Consulte o guia interno para orientar novas integracoes da suite.',
                                },
                            ].map((item) => (
                                <article
                                    key={item.title}
                                    className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-5"
                                >
                                    <h3 className="text-base font-semibold text-white">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                                        {item.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}

function DashboardPanel({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <article className="rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                {eyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                {title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
        </article>
    );
}

function LinkButton({
    href,
    label,
    secondary = false,
}: {
    href: string;
    label: string;
    secondary?: boolean;
}) {
    return (
        <Button
            asChild
            className={
                secondary
                    ? 'rounded-full border border-white/10 bg-white/[0.05] px-5 text-white hover:bg-white/[0.08]'
                    : 'rounded-full bg-white px-5 text-black hover:bg-white/90'
            }
        >
            <a href={href}>{label}</a>
        </Button>
    );
}
