import {forwardRef, type InputHTMLAttributes, type ReactNode} from "react";
import {cn} from "shared/utiles/cn";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({label, className, disabled, ...props}, ref) => (
        <label
            className={cn(
                "inline-flex items-center gap-2 cursor-pointer select-none",
                disabled && "cursor-not-allowed opacity-60"
            )}
        >
            <input
                ref={ref}
                type="checkbox"
                disabled={disabled}
                className="peer sr-only"
                {...props}
            />
            <span
                className={cn(
                    "w-4 h-4 border rounded flex items-center justify-center",
                    "border-input bg-white",
                    "peer-checked:bg-primary peer-checked:border-primary peer-checked:[&>svg]:block",
                    className
                )}
            >
                <svg
                    className="w-3 h-4 text-primary-foreground hidden"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </span>
            {label && <span className="text-sm">{label}</span>}
        </label>
    )
);

Checkbox.displayName = "Checkbox";
