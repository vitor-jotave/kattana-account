import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="min-h-svh max-w-full overflow-x-clip bg-[#050505] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(240,255,110,0.08),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(70,242,154,0.08),_transparent_28%)]" />
            <div className="relative mx-auto flex min-h-svh w-[97vw] max-w-[97vw] items-center justify-center overflow-x-clip p-4 md:p-6">
                <div className="w-full max-w-[min(30rem,97vw-2rem)] rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top_left,_rgba(237,255,92,0.12),_transparent_38%),radial-gradient(circle_at_85%_18%,rgba(72,255,167,0.08),_transparent_24%),linear-gradient(180deg,rgba(20,20,20,0.96),rgba(7,7,7,0.96))] p-6 shadow-[0_32px_90px_rgba(0,0,0,0.45)] sm:p-8">
                    <div className="flex flex-col">
                        <div className="flex flex-col gap-6">
                            <Link
                                href={home()}
                                className="mx-auto inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                            >
                                <img
                                    src="/images/logo-site.png"
                                    alt="Kattana"
                                    className="h-9 w-auto"
                                />
                            </Link>

                            <div className="space-y-4 text-center">
                                <div className="space-y-3">
                                    <h1 className="max-w-full text-3xl font-semibold tracking-tight text-white sm:text-[2rem] sm:leading-[1.05]">
                                        {title}
                                    </h1>
                                    <p className="mx-auto max-w-md text-sm leading-7 text-zinc-400 sm:text-base">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 [&_[data-slot=button]]:rounded-2xl [&_[data-slot=button]]:font-medium [&_[data-slot=button]]:shadow-none [&_[data-slot=checkbox]]:size-5 [&_[data-slot=input]]:h-14 [&_[data-slot=input]]:rounded-2xl [&_[data-slot=input]]:border-white/8 [&_[data-slot=input]]:bg-white/[0.03] [&_[data-slot=input]]:px-4 [&_[data-slot=input]]:text-white [&_[data-slot=input]]:placeholder:text-zinc-500 [&_[data-slot=input]]:focus-visible:border-[#dfff4f] [&_[data-slot=input]]:focus-visible:ring-[#dfff4f]/15 [&_label]:text-sm [&_label]:font-medium [&_label]:text-zinc-300">
                            {children}
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-4 border-t border-white/8 pt-5 text-center text-xs text-zinc-500">
                            <span>Conta Kattana</span>
                            <span className="h-1 w-1 rounded-full bg-zinc-700" />
                            <span>Acesso confiavel em toda a suite</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
