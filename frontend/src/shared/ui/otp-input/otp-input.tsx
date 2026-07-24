import {useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent} from "react";
import {cn} from "shared/lib/cn";

interface OtpInputProps {
    length?: number;
    onChange?: (code: string) => void;
    onComplete?: (code: string) => void;
    disabled?: boolean;
    error?: boolean;
    autoFocus?: boolean;
}

const onlyDigits = (value: string): string => value.replace(/[^0-9]/g, "");

export const OtpInput = ({
    length = 4,
    onChange,
    onComplete,
    disabled,
    error,
    autoFocus,
}: OtpInputProps) => {
    const [values, setValues] = useState<string[]>(Array(length).fill(""));
    const inputs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        if (autoFocus) {
            inputs.current[0]?.focus();
        }
    }, [autoFocus]);

    const focusInput = (index: number) => {
        inputs.current[index]?.focus();
    };

    const emit = (next: string[]) => {
        const joined = next.join("");
        onChange?.(joined);
        if (next.every((v) => v !== "")) {
            onComplete?.(joined);
        }
    };

    const handleChange = (index: number, raw: string) => {
        const digits = onlyDigits(raw);
        if (!digits) {
            return;
        }
        const digit = digits.slice(-1);
        const next = [...values];
        next[index] = digit;
        setValues(next);
        if (index < length - 1) {
            focusInput(index + 1);
        }
        emit(next);
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            const next = [...values];
            if (values[index] === "") {
                if (index > 0) {
                    next[index - 1] = "";
                    setValues(next);
                    focusInput(index - 1);
                    emit(next);
                }
            } else {
                next[index] = "";
                setValues(next);
                emit(next);
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            focusInput(index - 1);
        } else if (e.key === "ArrowRight" && index < length - 1) {
            focusInput(index + 1);
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const digits = onlyDigits(e.clipboardData.getData("text")).slice(0, length);
        if (!digits) {
            return;
        }
        const next = Array(length).fill("");
        for (let i = 0; i < length; i += 1) {
            next[i] = digits[i] ?? "";
        }
        setValues(next);
        const nextEmpty = next.findIndex((v) => v === "");
        focusInput(nextEmpty === -1 ? length - 1 : nextEmpty);
        emit(next);
    };

    return (
        <div className="flex gap-2 sm:gap-3">
            {values.map((value, i) => (
                <input
                    key={i}
                    ref={(el) => {
                        inputs.current[i] = el;
                    }}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    autoComplete="off"
                    pattern="[0-9]*"
                    disabled={disabled}
                    value={value}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    className={cn(
                        "h-12 w-12 rounded border bg-white text-center text-lg outline-none",
                        "focus-visible:ring-2 focus-visible:ring-ring",
                        "disabled:opacity-50 disabled:pointer-events-none",
                        error ? "border-destructive" : "border-input"
                    )}
                />
            ))}
        </div>
    );
};
