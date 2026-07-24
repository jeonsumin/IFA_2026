import {cn} from "shared/lib/cn";

interface TextfieldItemProps {
    title: string;
    required?: boolean;
    error?: boolean;
    value?: string;
    onChange: (v: string) => void;
}

export const TextfieldItem = ({title, required, error, value, onChange}: TextfieldItemProps) => (
    <div className="flex flex-col gap-2">
        <p className="font-medium">
            {title}
            {required && <span className="text-destructive"> *</span>}
        </p>
        <textarea
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            className={cn(
                "rounded border bg-white px-3 py-2 outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring",
                error ? "border-destructive" : "border-input"
            )}
        />
    </div>
);
