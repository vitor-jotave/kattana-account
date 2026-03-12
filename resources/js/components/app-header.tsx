import { Link, usePage } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import { docs } from '@/routes';
import { edit as appearanceEdit } from '@/routes/appearance';
import { edit as profileEdit } from '@/routes/profile';
import { edit as passwordEdit } from '@/routes/user-password';
import { show as twoFactorShow } from '@/routes/two-factor';
import type { BreadcrumbItem, NavItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const navigationItems: NavItem[] = [
    {
        title: 'Perfil',
        href: profileEdit(),
    },
    {
        title: 'Senha',
        href: passwordEdit(),
    },
    {
        title: 'Seguranca',
        href: twoFactorShow(),
    },
    {
        title: 'Docs',
        href: docs(),
    },
    {
        title: 'Aparencia',
        href: appearanceEdit(),
    },
];

export function AppHeader({ breadcrumbs = [] }: Props) {
    const { auth } = usePage().props;
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <header className="sticky top-0 z-40 px-3 pt-4 sm:px-4">
            <div className="mx-auto flex w-full max-w-[1300px] flex-col gap-4">
                <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(223,255,79,0.13),_transparent_38%),radial-gradient(circle_at_85%_18%,rgba(72,255,167,0.07),_transparent_24%),linear-gradient(180deg,rgba(21,21,21,0.94),rgba(9,9,9,0.96))] px-4 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-6">
                    <div className="min-w-0 shrink-0">
                        <Link href={profileEdit()} className="flex min-w-0 items-center">
                            <AppLogo />
                        </Link>
                    </div>

                    <nav className="hidden min-w-0 flex-1 justify-center lg:flex">
                        <div className="flex max-w-full items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-2">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className={cn(
                                        'rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap text-zinc-400 transition-colors hover:text-white',
                                        isCurrentUrl(item.href) &&
                                            'bg-[#dfff4f] text-black hover:text-black',
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-right sm:block">
                            <p className="text-sm font-medium text-white">
                                {auth.user.name}
                            </p>
                            <p className="text-xs text-zinc-500">
                                {auth.user.email}
                            </p>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="rounded-full border border-white/10 bg-white/[0.05] px-4 text-white hover:bg-white/[0.08]">
                                    Conta
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-64 rounded-2xl border-white/10 bg-[#111111] text-white"
                                align="end"
                            >
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button className="rounded-full border border-white/10 bg-white/[0.05] px-3 text-white hover:bg-white/[0.08]">
                                        Menu
                                    </Button>
                                </SheetTrigger>
                                <SheetContent className="border-white/10 bg-[#0b0b0b] text-white">
                                    <SheetHeader>
                                        <SheetTitle className="text-white">
                                            Navegacao
                                        </SheetTitle>
                                    </SheetHeader>

                                    <div className="mt-8 flex flex-col gap-2">
                                        {navigationItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className={cn(
                                                    'rounded-2xl px-4 py-3 text-sm text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-white',
                                                    isCurrentUrl(item.href) &&
                                                        'bg-[#dfff4f] text-black hover:bg-[#dfff4f] hover:text-black',
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>

                {breadcrumbs.length > 1 && (
                    <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-5 py-3 text-zinc-500">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                )}
            </div>
        </header>
    );
}
