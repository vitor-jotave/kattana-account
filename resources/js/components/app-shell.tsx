import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import type { AppVariant } from '@/types';

type Props = {
    children: ReactNode;
    variant?: AppVariant;
};

export function AppShell({ children, variant = 'sidebar' }: Props) {
    const isOpen = usePage().props.sidebarOpen;

    if (variant === 'header') {
        return (
            <div className="flex min-h-screen w-full flex-col overflow-x-clip bg-[radial-gradient(circle_at_top_left,_rgba(223,255,79,0.08),_transparent_24%),radial-gradient(circle_at_85%_0%,rgba(72,255,167,0.06),_transparent_18%),linear-gradient(180deg,#050505_0%,#090909_100%)]">
                {children}
            </div>
        );
    }

    return <SidebarProvider defaultOpen={isOpen}>{children}</SidebarProvider>;
}
