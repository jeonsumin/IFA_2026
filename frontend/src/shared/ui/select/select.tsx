import {useEffect, useId, useRef, useState, type KeyboardEvent} from "react";
import {ChevronDown} from "lucide-react";
import {cn} from "shared/lib/cn";

interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

interface SelectProps {
    options: SelectOption[];
    value?: string;              // controlled
    defaultValue?: string;       // uncontrolled 초기값
    placeholder?: string;
    disabled?: boolean;
    className?: string;          // 트리거 className
    onValueChange?: (value: string) => void;
    name?: string;               // 폼 필드 키 — 닫힘 시 onBlur(name)로 전달
    onBlur?: (name: string) => void;  // 닫힐 때(선택/바깥클릭/ESC/토글) name과 함께 fire — 폼 touched 공통 처리용
}

export const Select = ({
    options,
    value,
    defaultValue,
    placeholder = "선택",
    disabled,
    className,
    onValueChange,
    name,
    onBlur,
}: SelectProps) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<string | undefined>(defaultValue);
    const selected = isControlled ? value : internal;

    const [open, setOpen] = useState(false);
    const [highlight, setHighlight] = useState(-1);
    const rootRef = useRef<HTMLDivElement>(null);
    const listId = useId();

    const selectedOption = options.find((o) => o.value === selected);

    // 닫힘(open true→false) 시점에 onBlur fire — native input과 동일한 touched 시점
    const wasOpen = useRef(false);
    useEffect(() => {
        if (wasOpen.current && !open) onBlur?.(name ?? "");
        wasOpen.current = open;
    }, [open, onBlur, name]);

    // 바깥 클릭 닫기
    useEffect(() => {
        if (!open) return;
        const onDown = (e: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [open]);

    const commit = (option: SelectOption) => {
        if (option.disabled) return;
        if (!isControlled) setInternal(option.value);
        onValueChange?.(option.value);
        setOpen(false);
    };

    const moveHighlight = (dir: 1 | -1) => {
        setHighlight((prev) => {
            let next = prev;
            for (let i = 0; i < options.length; i++) {
                next = (next + dir + options.length) % options.length;
                if (!options[next]?.disabled) return next;
            }
            return prev;
        });
    };

    // <button>은 Enter/Space가 native click + onKeyDown 이중 발화 → 처리 키는 preventDefault로 억제
    const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;
        switch (e.key) {
            case "Enter":
            case " ":
                e.preventDefault();
                if (!open) {
                    setOpen(true);
                    setHighlight(Math.max(0, options.findIndex((o) => o.value === selected)));
                } else if (highlight >= 0 && options[highlight]) {
                    commit(options[highlight]);
                }
                break;
            case "ArrowDown":
                e.preventDefault();
                if (!open) {
                    setOpen(true);
                    setHighlight(Math.max(0, options.findIndex((o) => o.value === selected)));
                } else {
                    moveHighlight(1);
                }
                break;
            case "ArrowUp":
                e.preventDefault();
                if (open) moveHighlight(-1);
                break;
            case "Escape":
                setOpen(false);
                break;
        }
    };

    return (
        <div ref={rootRef} className="relative w-full">
            <button
                type="button"
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listId}
                disabled={disabled}
                onClick={() => !disabled && setOpen((v) => !v)}
                onKeyDown={onKeyDown}
                className={cn(
                    "flex w-full items-center justify-between rounded border border-input bg-white px-3 py-2 text-left outline-none",
                    "focus-visible:ring-2 focus-visible:ring-ring",
                    "disabled:opacity-50 disabled:pointer-events-none",
                    className
                )}
            >
                <span className={cn(!selectedOption && "text-muted-foreground")}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")}/>
            </button>

            {open && (
                <ul
                    id={listId}
                    role="listbox"
                    className="absolute z-50 max-h-60 w-full overflow-y-auto rounded border border-input bg-white py-1 shadow-lg"
                >
                    {options.map((option, i) => {
                        const isSelected = option.value === selected;
                        return (
                            <li
                                key={option.value}
                                role="option"
                                aria-selected={isSelected}
                                aria-disabled={option.disabled}
                                onMouseEnter={() => setHighlight(i)}
                                onClick={() => commit(option)}
                                className={cn(
                                    "cursor-pointer px-3 py-2",
                                    option.disabled && "cursor-not-allowed opacity-50",
                                    i === highlight && !option.disabled && "bg-muted",
                                    isSelected && "font-semibold text-primary"
                                )}
                            >
                                {option.label}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
