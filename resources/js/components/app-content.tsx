import * as React from 'react';
import { SidebarInset } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { AppVariant } from '@/types';

type Props = React.ComponentProps<'main'> & {
    variant?: AppVariant;
};

export function AppContent({ variant = 'sidebar', children, ...props }: Props) {
    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

    return (
        <main
            className={cn(
                'mx-auto flex h-full w-full max-w-[1300px] flex-1 flex-col gap-6 pb-8 px-3 sm:px-4',
                props.className,
            )}
            {...props}
        >
            {children}
        </main>
    );
}
