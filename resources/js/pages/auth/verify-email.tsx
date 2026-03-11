// Components
import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Verifique seu e-mail"
            description="Confirme seu endereco de e-mail para liberar toda a experiencia da Conta Kattana."
        >
            <Head title="Verificacao de e-mail" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                    Um novo link de verificacao foi enviado para o e-mail
                    informado no cadastro.
                </div>
            )}

            <Form {...send.form()} className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <Button
                            disabled={processing}
                            className="h-14 w-full rounded-full bg-white text-black hover:bg-white/90"
                        >
                            {processing && <Spinner />}
                            Reenviar e-mail de verificacao
                        </Button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block text-sm text-zinc-400 decoration-white/15 hover:text-white hover:decoration-white"
                        >
                            Sair
                        </TextLink>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
