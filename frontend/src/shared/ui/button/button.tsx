import {forwardRef, type ButtonHTMLAttributes} from "react";
import {cn} from "shared/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
}

const variantClass: Record<Variant, string> = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    outline: "border border-button-border bg-white hover:bg-muted",
    ghost: "bg-transparent hover:bg-muted",
};

const sizeClass: Record<Size, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({variant = "primary", size = "md", type = "button", className, ...props}, ref) => (
        <button
            ref={ref}
            type={type}
            className={cn(
                "inline-flex items-center justify-center rounded font-medium transition-colors",
                "disabled:opacity-50 disabled:pointer-events-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                variantClass[variant],
                sizeClass[size],
                className
            )}
            {...props}
        />
    )
);

Button.displayName = "Button";
