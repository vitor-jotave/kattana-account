import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { docsSections } from '@/data/docs';
import AppLayout from '@/layouts/app-layout';
import { login, register } from '@/routes';
import { edit as profileEdit } from '@/routes/profile';
import type { Auth, BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Docs',
        href: '/docs',
    },
];

function DocsContent() {
    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
            <section className="rounded-[1.75rem] border border-border/70 bg-card shadow-sm">
                <div className="space-y-5 px-6 py-8 sm:px-8">
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="outline" className="rounded-full px-3 py-1">
                            Documentation
                        </Badge>
                        <Badge variant="secondary" className="rounded-full px-3 py-1">
                            Diataxis-inspired
                        </Badge>
                    </div>

                    <div className="max-w-3xl space-y-3">
                        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            Integracao da Conta Kattana com apps da suite
                        </h1>
                        <p className="text-base leading-7 text-muted-foreground sm:text-lg">
                            Esta pagina foi reorganizada em um formato comum de documentacao:
                            <strong> Overview</strong>, <strong>How-to</strong>, <strong>Reference</strong> e <strong>Explanation</strong>.
                            O objetivo e mostrar apenas o necessario para integrar outro app, como o Economizze.
                        </p>
                    </div>

                    <Card className="border-border/70 bg-muted/25">
                        <CardHeader>
                            <CardTitle>Regra curta</CardTitle>
                            <CardDescription>
                                Se voce lembrar de uma unica coisa, lembre disso.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <pre className="overflow-x-auto rounded-2xl bg-[#111111] p-4 text-sm leading-6 whitespace-pre-wrap text-[#f4f0e8]">
                                Conta Kattana = identidade global{'\n'}
                                App cliente = dados do produto{'\n'}
                                Vinculo = uuid/global_uuid
                            </pre>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
                <aside className="lg:sticky lg:top-6 lg:h-fit">
                    <Card className="border-border/70">
                        <CardHeader>
                            <CardTitle className="text-base">Indice</CardTitle>
                            <CardDescription>
                                Estrutura padrao de documentacao.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {docsSections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="flex items-start gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                >
                                    <Badge
                                        variant={
                                            section.kind === 'How-to'
                                                ? 'default'
                                                : section.kind === 'Reference'
                                                  ? 'secondary'
                                                  : 'outline'
                                        }
                                        className="mt-0.5 shrink-0 rounded-full"
                                    >
                                        {section.kind}
                                    </Badge>
                                    <span className="pt-0.5">{section.title}</span>
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
                                    <Badge
                                        variant={
                                            section.kind === 'How-to'
                                                ? 'default'
                                                : section.kind === 'Reference'
                                                  ? 'secondary'
                                                  : 'outline'
                                        }
                                        className="rounded-full px-3 py-1"
                                    >
                                        {section.kind}
                                    </Badge>
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-semibold tracking-tight">
                                            {section.title}
                                        </h2>
                                        <p className="max-w-3xl text-sm font-medium leading-6 text-foreground/85 sm:text-base">
                                            {section.summary}
                                        </p>
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
                        <p className="text-lg font-semibold">Documentation</p>
                    </div>

                    <nav className="flex flex-wrap items-center justify-end gap-2">
                        <Link href="/" className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                            Home
                        </Link>
                        <Link href="/docs" className="rounded-full bg-foreground px-4 py-2 text-sm text-background">
                            Docs
                        </Link>
                        {auth.user ? (
                            <Link href={profileEdit()} className="rounded-full border border-border px-4 py-2 text-sm">
                                Perfil
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
