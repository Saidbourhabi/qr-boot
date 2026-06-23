const downloadButtonClass = `
    w-full py-4 sm:py-5 px-6 sm:px-8 text-base sm:text-lg font-bold cursor-pointer
    bg-[#e4ff30] text-black border-2 border-white rounded
    shadow-[4px_4px_0px_#fff] sm:shadow-[5px_5px_0px_#fff]
    flex items-center justify-center gap-3
    transition-all duration-300 ease-in-out
    hover:bg-black hover:text-[#e4ff30] hover:border-white hover:shadow-[4px_4px_0px_#e4ff30] sm:hover:shadow-[5px_5px_0px_#e4ff30]
    active:bg-black active:text-white active:shadow-none active:translate-y-1
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#e4ff30] disabled:hover:text-black disabled:hover:shadow-[4px_4px_0px_#fff]
`;

export function DownloadButton({ children, loading, disabled, onClick, ...props }) {
return (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled || loading}
        className={downloadButtonClass}
        {...props}
    >
        {loading ? "Generating..." : children}
    </button>
);
}

export const secondaryButtonClass = `
    w-full py-3.5 sm:py-4 bg-zinc-900 hover:bg-zinc-800 border border-[#e4ff30] hover:border-zinc-600
    rounded font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base
`;
