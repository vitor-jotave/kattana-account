import { ShieldCheck, Sparkles, Waypoints } from 'lucide-react';

const highlight = {
    title: 'Uma identidade global',
    description:
        'Login, e-mail verificado e configuracoes de seguranca ficam centralizados na Conta Kattana.',
    tone: 'bg-[#e9ff3b] text-black',
};

const features = [
    {
        icon: ShieldCheck,
        label: 'Seguranca da conta',
        copy: 'Fluxos de autenticacao com Fortify, perfil, reset de senha e verificacao de e-mail.',
    },
    {
        icon: Waypoints,
        label: 'Acesso entre apps',
        copy: 'Pensado para handoff fluido entre produtos Kattana sem recriar autenticacao em cada app.',
    },
];

export default function AuthShowcase() {
    return (
        <div className="hidden min-w-0 lg:block">
            <div className="h-[calc(100svh-2rem)] max-h-[calc(100svh-2rem)] overflow-hidden rounded-[2rem] border border-white/8 bg-[#050505] p-4">
                <div className="grid h-full min-h-0 grid-cols-12 grid-rows-12 gap-4">
                    <div className="relative col-span-7 row-span-7 overflow-hidden rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top_left,_rgba(237,255,92,0.18),_transparent_40%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.015))] p-8">
                        <div className="absolute inset-x-8 top-8 flex items-center justify-between gap-4">
                            <img
                                src="/images/logo-site.png"
                                alt="Kattana"
                                className="h-10 w-auto max-w-[10rem] opacity-90"
                            />
                            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300">
                                Camada de identidade da suite
                            </div>
                        </div>

                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(72,255,167,0.12),transparent_24%),radial-gradient(circle_at_30%_84%,rgba(255,255,255,0.05),transparent_28%)]" />

                        <div className="relative flex h-full flex-col justify-end pb-2">
                            <p className="mb-3 text-sm uppercase tracking-[0.28em] text-zinc-400">
                                Conta Kattana
                            </p>
                            <h2 className="max-w-md text-[2.5rem] font-semibold tracking-tight text-white">
                                O centro de controle de cada conta Kattana.
                            </h2>
                            <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
                                Uma identidade unica em toda a suite, com fluxos seguros
                                de conta e um modelo de handoff pensado para apps conectados.
                            </p>
                        </div>
                    </div>

                    <div className="col-span-5 row-span-7 min-h-0 rounded-[2rem] border border-white/8 bg-white/[0.02] p-6">
                        <div className="grid h-full min-h-0 content-start gap-4">
                            {features.map(({ icon: Icon, label, copy }) => (
                                <div
                                    key={label}
                                    className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5"
                                >
                                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 text-white">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-sm font-medium text-white">
                                        {label}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                                        {copy}
                                    </p>
                                </div>
                            ))}

                            <div className="mt-auto rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#dfff4f] text-black">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <h3 className="text-sm font-medium text-white">
                                    Pronto para evoluir
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-zinc-400">
                                    Base enxuta agora, preparada para uma federacao mais robusta quando a suite exigir.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`col-span-12 row-span-5 rounded-[2rem] p-7 ${highlight.tone}`}
                    >
                        <div className="flex h-full flex-col justify-between">
                            <span className="w-fit rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em]">
                                Destaque
                            </span>
                            <div>
                                <h3 className="max-w-sm text-[2rem] font-semibold tracking-tight">
                                    {highlight.title}
                                </h3>
                                <p className="mt-3 max-w-lg text-sm leading-6 text-black/72">
                                    {highlight.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
