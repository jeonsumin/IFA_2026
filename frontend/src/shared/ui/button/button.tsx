import {forwardRef, type ButtonHTMLAttributes} from "react";
import {Check} from "lucide-react";
import {cn} from "shared/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "default" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    /** outline 변형에서 활성(선택) 여부 — 그라데이션 테두리/텍스트로 전환 */
    active?: boolean;
    /** 시작/끝에 기본 체크 아이콘 표시 (예: outline 선택 항목) */
    startIcon?: boolean;
    endIcon?: boolean;
}

const baseVariant: Record<Exclude<Variant, "outline">, string> = {
    // NEXT: 빨강→핑크→퍼플 그라데이션 채움
    primary:
        "bg-lg-ai-gradient text-white",
    ghost: "bg-transparent",
};

// 활성
const outlineActive =
    "border-2 border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(90deg,var(--lg-red),var(--lg-ai-pink),var(--lg-ai-purple))_border-box]";

// 비활성
const outlineInactive = "border border-lg-gray-5 bg-white text-lg-gray-3";

// 활성 outline 텍스트는 그라데이션 (배경은 테두리 트릭이 점유하므로 별도 span)
const outlineActiveText =
    "bg-lg-ai-gradient bg-clip-text text-primary font-medium";

const sizeClass: Record<Size, string> = {
    default: "text-base py-[17px]",
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
};

// outline 우측 체크 (Lucide): 활성=그라데이션 stroke, 비활성=연한 회색
const CheckIcon = ({active}: { active: boolean }) =>
    active ? (
        <>
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id="btn-check-grad" x1="0" y1="0" x2="24" y2="0">
                        <stop offset="0%" stopColor="var(--lg-red)"/>
                        <stop offset="50%" stopColor="var(--lg-ai-pink)"/>
                        <stop offset="100%" stopColor="var(--lg-ai-purple)"/>
                    </linearGradient>
                </defs>
            </svg>
            <Check className="shrink-0" stroke="url(#btn-check-grad)"/>
        </>
    ) : (
        <Check className="shrink-0 text-lg-gray-4"/>
    );

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "default",
            active = false,
            type = "button",
            className,
            startIcon,
            endIcon,
            children,
            ...props
        },
        ref
    ) => {
        const isOutline = variant === "outline";
        const variantCls = isOutline ? (active ? outlineActive : outlineInactive) : baseVariant[variant];

        return (
            <button
                ref={ref}
                type={type}
                className={cn(
                    "w-full rounded-full",
                    isOutline && "",
                    "disabled:bg-none disabled:bg-disable disabled:pointer-events-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    variantCls,
                    sizeClass[size],
                    className
                )}
                {...props}
            >
                {isOutline ? (
                    <>
                        <span className={cn(
                            "flex items-center gap-2 justify-between px-5",
                            active ? outlineActiveText : undefined)}
                        >
                            {startIcon && <CheckIcon active={active}/>}
                            <div className="flex-1 text-start">
                            {children}
                            </div>
                            {endIcon && <CheckIcon active={active}/>}
                        </span>
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = "Button";
