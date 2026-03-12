import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useClipboard } from '@/hooks/use-clipboard';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Perfil',
        href: edit(),
    },
];

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage().props;
    const [copiedValue, copy] = useClipboard();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Perfil" />

            <h1 className="sr-only">Configurações de perfil</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <Heading
                        variant="small"
                        title="Informações do perfil"
                        description="Gerencie a identidade global da sua conta Kattana."
                    />

                    <div className="grid gap-2 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,20,20,0.96),rgba(8,8,8,0.98))] p-5 text-white">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-medium text-white">
                                    Identificador global da conta
                                </p>
                                <p className="text-sm leading-6 text-zinc-400">
                                    Esse UUID é o identificador oficial da sua conta
                                    entre os apps da suíte Kattana.
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => copy(auth.user.uuid)}
                                className="rounded-full border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.08]"
                            >
                                {copiedValue === auth.user.uuid ? 'Copiado' : 'Copiar'}
                            </Button>
                        </div>

                        <Input
                            value={auth.user.uuid}
                            readOnly
                            className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white"
                        />
                    </div>

                    <Form
                        {...ProfileController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-6 text-white">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-zinc-200">
                                        Nome
                                    </Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block h-12 w-full rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-500"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Seu nome completo"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-zinc-200">
                                        E-mail
                                    </Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block h-12 w-full rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-500"
                                        defaultValue={auth.user.email}
                                        name="email"
                                        required
                                        autoComplete="username"
                                        placeholder="voce@exemplo.com"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                {mustVerifyEmail &&
                                    auth.user.email_verified_at === null && (
                                        <div>
                                            <p className="-mt-2 text-sm leading-6 text-zinc-400">
                                                Seu e-mail ainda não foi verificado.{` `}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="text-[#dfff4f] underline decoration-[#dfff4f]/40 underline-offset-4 transition-colors hover:decoration-[#dfff4f]"
                                                >
                                                    Reenviar e-mail de verificação.
                                                </Link>
                                            </p>

                                            {status ===
                                                'verification-link-sent' && (
                                                <div className="mt-2 text-sm font-medium text-[#dfff4f]">
                                                    Um novo link de verificação foi
                                                    enviado para o seu e-mail.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        className="rounded-full bg-white px-5 text-black hover:bg-white/90"
                                        data-test="update-profile-button"
                                    >
                                        Salvar alterações
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-zinc-400">
                                            Salvo
                                        </p>
                                    </Transition>
                                </div>
                            </div>
                        )}
                    </Form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
