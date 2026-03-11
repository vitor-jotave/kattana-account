import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
    nickname?: string;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
    nickname,
}: Props) {
    const personalizedTitle =
        nickname && nickname.trim() !== ''
            ? `${nickname.trim().charAt(0).toUpperCase()}${nickname.trim().slice(1)} né? Que bom te ver por aqui!`
            : 'Que bom te ver por aqui!';

    return (
        <AuthLayout
            title={personalizedTitle}
            description="Acesse sua conta Kattana para continuar pela suite com uma identidade unica e confiavel."
        >
            <Head title="Entrar" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        {status && (
                            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                                {status}
                            </div>
                        )}

                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="voce@exemplo.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Senha</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm"
                                            tabIndex={5}
                                        >
                                            Esqueceu sua senha?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Sua senha"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Lembrar de mim</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 h-14 w-full rounded-full bg-white text-black hover:bg-white/90"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Entrar
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm text-zinc-500">
                                Ainda nao tem uma conta?{' '}
                                <TextLink
                                    href={register()}
                                    tabIndex={5}
                                    className="text-white decoration-white/20 hover:decoration-white"
                                >
                                    Criar conta
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
