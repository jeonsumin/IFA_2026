import {forwardRef, type InputHTMLAttributes} from "react";
import {cn} from "shared/utiles/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({error, className, ...props}, ref) => (
        <input
            ref={ref}
            className={cn(
                "rounded border bg-white px-3 py-2 outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring",
                error ? "border-destructive" : "border-input",
                className
            )}
            {...props}
        />
    )
);

Input.displayName = "Input";
