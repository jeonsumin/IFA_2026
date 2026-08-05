import {cn} from "shared/lib/cn";

interface CircleItemProps {
    error?: boolean;
    value?: string;
    onChange: (v: string) => void;
}

const scale = ["1", "2", "3", "4", "5"];

export const CircleItem = ({error, value, onChange}: CircleItemProps) => (
    <div className="flex w-full flex-col gap-2">
        <div className="flex justify-center gap-2.5">
            {scale.map((n) => (
                <button
                    key={n}
                    type="button"
                    onClick={() => onChange(n)}
                    className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full border text-xl font-bold transition-colors",
                        value === n
                            ? "border-lg-active-red bg-lg-active-red text-white"
                            : "border-state-disable-2 bg-white text-state-disable-1",
                        error && value !== n && "border-lg-active-red"
                    )}
                >
                    {n}
                </button>
            ))}
        </div>
        <div className="flex justify-between text-xs text-state-disable-1">
            <span>Strongly disagree</span>
            <span>Strongly agree</span>
        </div>
    </div>
);
