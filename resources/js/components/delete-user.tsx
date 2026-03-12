import { Form } from '@inertiajs/react';
import { useRef } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);

    return (
        <div className="space-y-6">
            <Heading
                variant="small"
                title="Excluir conta"
                description="Remova sua conta Kattana e encerre o acesso centralizado da sua identidade."
            />
            <div className="space-y-4 rounded-[1.75rem] border border-red-500/20 bg-[linear-gradient(180deg,rgba(40,13,13,0.96),rgba(17,9,9,0.98))] p-5 text-red-50">
                <div className="relative space-y-1">
                    <p className="font-medium text-red-200">Zona crítica</p>
                    <p className="text-sm leading-6 text-red-100/75">
                        Essa ação é permanente. Ao continuar, sua conta e o acesso
                        centralizado vinculado a ela serão removidos.
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className="rounded-full"
                            data-test="delete-user-button"
                        >
                            Excluir conta
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="border-white/10 bg-[#0b0b0b] text-white shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
                        <DialogTitle>
                            Tem certeza de que deseja excluir sua conta?
                        </DialogTitle>
                        <DialogDescription className="leading-6 text-zinc-400">
                            Depois da exclusão, o acesso à Conta Kattana e os dados
                            vinculados à conta serão removidos de forma permanente.
                            Digite sua senha para confirmar.
                        </DialogDescription>

                        <Form
                            {...ProfileController.destroy.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            onError={() => passwordInput.current?.focus()}
                            resetOnSuccess
                            className="space-y-6"
                        >
                            {({ resetAndClearErrors, processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="password"
                                            className="sr-only"
                                        >
                                            Senha
                                        </Label>

                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            ref={passwordInput}
                                            placeholder="Digite sua senha"
                                            autoComplete="current-password"
                                            className="h-12 rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-500"
                                        />

                                        <InputError message={errors.password} />
                                    </div>

                                    <DialogFooter className="gap-2">
                                        <DialogClose asChild>
                                            <Button
                                                variant="secondary"
                                                className="rounded-full border border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.08]"
                                                onClick={() =>
                                                    resetAndClearErrors()
                                                }
                                            >
                                                Cancelar
                                            </Button>
                                        </DialogClose>

                                        <Button
                                            variant="destructive"
                                            className="rounded-full"
                                            disabled={processing}
                                            asChild
                                        >
                                            <button
                                                type="submit"
                                                data-test="confirm-delete-user-button"
                                            >
                                                Confirmar exclusão
                                            </button>
                                        </Button>
                                    </DialogFooter>
                                </>
                            )}
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
