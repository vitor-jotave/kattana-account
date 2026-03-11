import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpenText, CheckCircle2, KeyRound, Network, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { docsHighlights, docsSections } from '@/data/docs';
import AppLayout from '@/layouts/app-layout';
import { dashboard, login, register } from '@/routes';
import type { Auth, BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Docs',
        href: '/docs',
    },
];

const sectionIcons = [ShieldCheck, KeyRound, Network, BookOpenText];

function DocsContent() {
    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
            <section className="overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-card via-card to-muted/50 shadow-sm">
                <div className="grid gap-10 px-6 py-8 lg:grid-cols-[minmax(0,1.2fr)_22rem] lg:px-10 lg:py-10">
                    <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="outline" className="rounded-full px-3 py-1">
                                Conta Kattana
                            </Badge>
                            <Badge variant="secondary" className="rounded-full px-3 py-1">
                                Integracao de apps Laravel
                            </Badge>
                        </div>

                        <div className="max-w-3xl space-y-4">
                            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                Guia de integracao da identidade global da suite Kattana
                            </h1>
                            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
                                Esta documentacao descreve a arquitetura real da Conta Kattana hoje,
                                explica o papel de <code className="rounded bg-muted px-1.5 py-0.5 text-sm">/api/me</code>
                                {' '}e mostra como um app da suite, como o Economizze, deve confiar na
                                identidade global sem recriar credenciais.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            {docsHighlights.map((item, index) => {
                                const Icon = sectionIcons[index % sectionIcons.length];

                                return (
                                    <Card key={item.title} className="border-border/70 bg-background/80">
                                        <CardHeader className="gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-foreground">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="space-y-1">
                                                <CardTitle className="text-base">{item.title}</CardTitle>
                                                <CardDescription className="leading-6">
                                                    {item.description}
                                                </CardDescription>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    <Card className="h-fit border-border/70 bg-background/90">
                        <CardHeader>
                            <CardTitle>Leitura rapida</CardTitle>
                            <CardDescription>
                                Se voce estiver integrando um novo app Laravel da suite, comece por aqui.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                            <p>
                                1. A Conta Kattana e a fonte de verdade da identidade.
                            </p>
                            <p>
                                2. O app cliente deve vincular seu usuario local por <code className="rounded bg-muted px-1.5 py-0.5">global_uuid</code>.
                            </p>
                            <p>
                                3. O endpoint <code className="rounded bg-muted px-1.5 py-0.5">/api/me</code> e a leitura canonica da identidade autenticada.
                            </p>
                            <p>
                                4. Dados de negocio continuam locais a cada produto da suite.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
                <aside className="lg:sticky lg:top-6 lg:h-fit">
                    <Card className="border-border/70">
                        <CardHeader>
                            <CardTitle className="text-base">Indice</CardTitle>
                            <CardDescription>
                                Secoes principais desta documentacao.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {docsSections.map((section, index) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="flex items-start gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                >
                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-foreground">
                                        {index + 1}
                                    </span>
                                    <span>{section.title}</span>
                                </a>
                            ))}
                        </CardContent>
                    </Card>
                </aside>

                <div className="space-y-6">
                    {docsSections.map((section) => (
                        <section
                            key={section.id}
                            id={section.id}
                            className="scroll-mt-8 rounded-[1.75rem] border border-border/70 bg-card shadow-sm"
                        >
                            <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
                                <div className="space-y-3">
                                    <Badge variant="outline" className="rounded-full px-3 py-1">
                                        {section.summary}
                                    </Badge>
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-semibold tracking-tight">
                                            {section.title}
                                        </h2>
                                        {section.body.map((paragraph) => (
                                            <p
                                                key={paragraph}
                                                className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base"
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {section.bullets && (
                                    <div className="grid gap-3 md:grid-cols-2">
                                        {section.bullets.map((bullet) => (
                                            <div
                                                key={bullet}
                                                className="flex gap-3 rounded-2xl border border-border/60 bg-muted/35 px-4 py-3"
                                            >
                                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />
                                                <p className="text-sm leading-6 text-muted-foreground">
                                                    {bullet}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.diagram && (
                                    <>
                                        <Separator />
                                        <div className="space-y-3">
                                            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                                Diagrama textual
                                            </h3>
                                            <pre className="overflow-x-auto rounded-2xl border border-border/70 bg-[#111111] p-4 text-sm leading-6 whitespace-pre-wrap text-[#f4f0e8]">
                                                {section.diagram}
                                            </pre>
                                        </div>
                                    </>
                                )}

                                {section.code && (
                                    <>
                                        <Separator />
                                        <div className="space-y-3">
                                            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                                {section.code.title}
                                            </h3>
                                            <pre className="overflow-x-auto rounded-2xl border border-border/70 bg-muted/45 p-4 text-sm leading-6 whitespace-pre-wrap">
                                                <code>{section.code.content}</code>
                                            </pre>
                                        </div>
                                    </>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}

function GuestShell() {
    const { auth } = usePage().props as { auth: Auth; canRegister?: boolean };
    const canRegister = usePage().props.canRegister as boolean | undefined;

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border/70 bg-background/95 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                    <div className="space-y-1">
                        <p className="text-sm font-medium tracking-[0.18em] text-muted-foreground uppercase">
                            Kattana Suite
                        </p>
                        <p className="text-lg font-semibold">Conta Kattana Docs</p>
                    </div>

                    <nav className="flex flex-wrap items-center justify-end gap-2">
                        <Link href="/" className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            Home
                        </Link>
                        <Link href="/docs" className="rounded-full bg-foreground px-4 py-2 text-sm text-background">
                            Docs
                        </Link>
                        {auth.user ? (
                            <Link href={dashboard()} className="rounded-full border border-border px-4 py-2 text-sm">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={login()} className="rounded-full border border-border px-4 py-2 text-sm">
                                    Log in
                                </Link>
                                {canRegister && (
                                    <Link href={register()} className="rounded-full border border-border px-4 py-2 text-sm">
                                        Register
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </div>
            </header>

            <DocsContent />
        </div>
    );
}

export default function Docs() {
    const { auth } = usePage().props as { auth: Auth };

    if (auth.user) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Docs" />
                <DocsContent />
            </AppLayout>
        );
    }

    return (
        <>
            <Head title="Docs" />
            <GuestShell />
        </>
    );
}
