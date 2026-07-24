import {useState} from "react";
import {Button} from "shared/ui";
import {surveyData} from "../model/survey";
import {CircleItem} from "./circle-item";
import {ButtonItem} from "./button-item";
import {TextfieldItem} from "./textfield-item";

export type SurveyAnswers = Record<string, string | string[]>;

interface SurveyProps {
    onSubmit: (answers: SurveyAnswers) => void;
}

const isAnswered = (value: string | string[] | undefined): boolean => {
    if (value === undefined) return false;
    if (Array.isArray(value)) return value.length > 0;
    return value.trim().length > 0;
};

export const Survey = ({onSubmit}: SurveyProps) => {
    const [answers, setAnswers] = useState<SurveyAnswers>({});
    const [showErrors, setShowErrors] = useState(false);

    const setAnswer = (surveyId: string, value: string | string[]) => {
        setAnswers((prev) => ({...prev, [surveyId]: value}));
    };

    const handleSubmit = () => {
        const hasError = surveyData.some(
            (item) => item.required && !isAnswered(answers[item.surveyId])
        );
        if (hasError) {
            setShowErrors(true);
            return;
        }
        onSubmit(answers);
    };

    return (
        <div className="flex flex-col gap-6">
            {surveyData.map((item) => {
                const error = showErrors && !!item.required && !isAnswered(answers[item.surveyId]);
                if (item.type === "circle") {
                    return (
                        <CircleItem
                            key={item.surveyId}
                            title={item.title}
                            required={item.required}
                            error={error}
                            value={answers[item.surveyId] as string | undefined}
                            onChange={(v) => setAnswer(item.surveyId, v)}
                        />
                    );
                }
                if (item.type === "list") {
                    return (
                        <ButtonItem
                            key={item.surveyId}
                            title={item.title}
                            questions={item.questions ?? []}
                            required={item.required}
                            mult={item.mult}
                            error={error}
                            value={answers[item.surveyId]}
                            onChange={(v) => setAnswer(item.surveyId, v)}
                        />
                    );
                }
                return (
                    <TextfieldItem
                        key={item.surveyId}
                        title={item.title}
                        required={item.required}
                        error={error}
                        value={answers[item.surveyId] as string | undefined}
                        onChange={(v) => setAnswer(item.surveyId, v)}
                    />
                );
            })}
            <Button size="lg" onClick={handleSubmit}>
                009_survey_submit
            </Button>
        </div>
    );
};
