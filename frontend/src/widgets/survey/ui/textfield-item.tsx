import {cn} from "shared/lib/cn";

interface TextfieldItemProps {
    error?: boolean;
    value?: string;
    onChange: (v: string) => void;
}

export const TextfieldItem = ({error, value, onChange}: TextfieldItemProps) => (
    <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className={cn(
            "w-full rounded-md border bg-white px-4 py-3 text-base text-state-text-body outline-none",
            "placeholder:text-placeholder focus-visible:ring-2 focus-visible:ring-ring",
            error ? "border-lg-active-red" : "border-state-line"
        )}
    />
);
