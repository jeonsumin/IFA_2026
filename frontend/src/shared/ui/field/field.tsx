import type {ReactNode} from "react";

export const Field = ({label, error, children}: { label: string; error?: string; children: ReactNode }) => (
    <div className="flex w-full flex-col gap-2">
        <span className="text-xs font-semibold tracking-[-0.24px] text-black">{label}</span>
        {children}
        {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
);

