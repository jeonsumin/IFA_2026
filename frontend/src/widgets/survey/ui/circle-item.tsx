import {cn} from "shared/lib/cn";

interface CircleItemProps {
    title: string;
    required?: boolean;
    error?: boolean;
    value?: string;
    onChange: (v: string) => void;
}

const scale = ["1", "2", "3", "4", "5"];

export const CircleItem = ({title, required, error, value, onChange}: CircleItemProps) => (
    <div className="flex flex-col gap-2">
        <p className="font-medium">
            {title}
            {required && <span className="text-destructive"> *</span>}
        </p>
        <div className="flex gap-3">
            {scale.map((n) => (
                <button
                    key={n}
                    type="button"
                    onClick={() => onChange(n)}
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                        value === n
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-white border-input",
                        error && value !== n && "border-destructive"
                    )}
                >
                    {n}
                </button>
            ))}
        </div>
    </div>
);
