import {Check} from "lucide-react";
import {cn} from "shared/lib/cn";

interface CheckItemProps {
    questions: { img?: string; content: string }[];
    mult?: boolean;
    error?: boolean;
    value?: string | string[];
    onChange: (v: string | string[]) => void;
}

export const CheckItem = ({questions, mult, error, value, onChange}: CheckItemProps) => {
    const isSelected = (content: string) =>
        mult ? Array.isArray(value) && value.includes(content) : value === content;

    const handleClick = (content: string) => {
        if (mult) {
            const current = Array.isArray(value) ? value : [];
            onChange(
                current.includes(content)
                    ? current.filter((c) => c !== content)
                    : [...current, content]
            );
        } else {
            onChange(content);
        }
    };

    return (
        <div className="flex w-full flex-col gap-2">
            {questions.map((q) => {
                const selected = isSelected(q.content);
                return (
                    <button
                        key={q.content}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => handleClick(q.content)}
                        className={cn(
                            "flex items-center gap-4 w-full border bg-white py-4 text-left text-base text-state-text-body transition-colors",
                            q.img ? 'w-full rounded-md justify-start pr-3' : "rounded-full px-6",
                            selected ? "border-lg-active-red" : "border-state-disable-2",
                            error && "border-lg-active-red"
                        )}
                    >
                        {q.img && <img src={q.img} alt="" className={"size-24"}/>}
                        <span className="flex-1">{q.content}</span>
                        <span
                            className={cn(
                                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white transition-colors",
                                selected ? "bg-lg-active-red" : "bg-state-disable-2"
                            )}
                        >
                            <Check className="h-3.5 w-3.5" strokeWidth={3}/>
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
