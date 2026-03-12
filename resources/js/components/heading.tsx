export default function Heading({
    title,
    description,
    variant = 'default',
}: {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
}) {
    return (
        <header className={variant === 'small' ? 'space-y-1.5' : 'mb-8 space-y-1.5'}>
            <h2
                className={
                    variant === 'small'
                        ? 'text-lg font-semibold tracking-tight text-white'
                        : 'text-2xl font-semibold tracking-tight text-white'
                }
            >
                {title}
            </h2>
            {description && (
                <p className="max-w-2xl text-sm leading-6 text-zinc-400">
                    {description}
                </p>
            )}
        </header>
    );
}
