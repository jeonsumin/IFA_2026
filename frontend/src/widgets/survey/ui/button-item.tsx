import {Button} from "shared/ui";

interface ButtonItemProps {
    title: string;
    questions: {content: string}[];
    required?: boolean;
    mult?: boolean;
    error?: boolean;
    startIcon?: boolean;
    endIcon?: boolean;
    value?: string | string[];
    onChange: (v: string | string[]) => void;
}

export const ButtonItem = ({title, questions, required, mult, error, value, endIcon, startIcon, onChange}: ButtonItemProps) => {
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
        <div className="flex flex-col gap-2">
            <p className="font-medium">
                {title}
                {required && <span className="text-destructive"> *</span>}
            </p>
            <div className="flex flex-col gap-2">
                {questions.map((q) => (
                    <Button
                        key={q.content}
                        variant="outline"
                        active={isSelected(q.content)}
                        endIcon={endIcon}
                        startIcon={startIcon}
                        onClick={() => handleClick(q.content)}
                        className="tracking-[-0.74px] rounded-2xl"
                    >
                        {q.content}
                    </Button>
                ))}
            </div>
            {error && <p className="text-sm text-destructive">*</p>}
        </div>
    );
};
