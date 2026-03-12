import type { PropsWithChildren } from 'react';
import Heading from '@/components/heading';

export default function SettingsLayout({ children }: PropsWithChildren) {
    return (
        <div className="px-3 py-6 sm:px-0">
            <div className="max-w-3xl space-y-8">
                <Heading
                    title="Configurações"
                    description="Gerencie os dados, a segurança e a aparência da sua conta Kattana."
                />

                <section className="space-y-12">{children}</section>
            </div>
        </div>
    );
}
