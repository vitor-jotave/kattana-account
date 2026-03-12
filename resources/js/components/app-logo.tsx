export default function AppLogo() {
    return (
        <>
            <img
                src="/images/logo-site.png"
                alt="Kattana"
                className="h-8 w-auto sm:h-9"
            />
            <div className="ml-3 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold text-white">
                    Conta Kattana
                </span>
                <span className="truncate text-xs text-zinc-500">
                    Central de identidade da suite
                </span>
            </div>
        </>
    );
}
