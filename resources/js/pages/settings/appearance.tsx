import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Aparência',
        href: editAppearance(),
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Aparência" />

            <h1 className="sr-only">Configurações de aparência</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <Heading
                        variant="small"
                        title="Aparência"
                        description="Escolha como a interface da sua conta deve ser exibida."
                    />
                    <div className="rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-6 text-white">
                        <p className="mb-5 max-w-2xl text-sm leading-6 text-zinc-400">
                            Você pode fixar o modo claro, o modo escuro ou deixar a
                            Conta Kattana seguir automaticamente a preferência do
                            sistema.
                        </p>
                        <AppearanceTabs />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
