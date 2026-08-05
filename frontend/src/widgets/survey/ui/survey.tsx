import {useState} from "react";
import {Button} from "shared/ui";
import type {SurveyAnswers} from "entities/survey";
import {surveyData} from "../model/survey";
import {CircleItem} from "./circle-item";
import {CheckItem} from "./check-item";
import {TextfieldItem} from "./textfield-item";

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
        <div className="min-h-full bg-bg-default">
            <div className="flex flex-col gap-5 px-5 py-8">
                <div className="flex flex-col items-center gap-2 text-center">
                    <img
                        src="/images/welcome/cloi.png"
                        alt="LG 클로이 로봇"
                        className="w-40 max-w-full"
                    />

                    <p className="text-sm leading-relaxed text-state-text-body">
                        This survey is designed to <br/>
                        collect feedback on your experience<br/>
                        at the LG booth during IFA 2026.<br/>
                        We kindly ask you to share<br/>
                        your honest opinions, which will be<br/>
                        used for internal purposes only.
                    </p>

                    <p className="text-sm font-semibold text-state-text-body">
                        ※ This survey consists of 5 questions.
                    </p>
                </div>

                {surveyData.map((item, index) => {
                    const error =
                        showErrors && !!item.required && !isAnswered(answers[item.surveyId]);
                    return (
                        <div
                            key={item.surveyId}
                            className="flex flex-col items-center gap-6 rounded-2xl bg-white px-5 py-6"
                        >
                            <div className="flex w-full flex-col items-center gap-2 text-center">
                                <p className="text-xl font-bold text-lg-active-red">
                                    Q{index + 1}.
                                </p>
                                <p className="text-base tracking-tight text-black">
                                    {item.title}
                                    {item.required && (
                                        <span className="text-lg-active-red"> *</span>
                                    )}
                                </p>
                            </div>

                            {item.type === "circle" && (
                                <CircleItem
                                    error={error}
                                    value={answers[item.surveyId] as string | undefined}
                                    onChange={(v) => setAnswer(item.surveyId, v)}
                                />
                            )}
                            {item.type === "list" && (
                                <CheckItem
                                    questions={item.questions ?? []}
                                    mult={item.mult}
                                    error={error}
                                    value={answers[item.surveyId]}
                                    onChange={(v) => setAnswer(item.surveyId, v)}
                                />
                            )}
                            {item.type === "text" && (
                                <TextfieldItem
                                    error={error}
                                    value={answers[item.surveyId] as string | undefined}
                                    onChange={(v) => setAnswer(item.surveyId, v)}
                                />
                            )}
                        </div>
                    );
                })}

                <Button size="lg" className="mt-2" onClick={handleSubmit}>
                    009_survey_submit
                </Button>
            </div>
        </div>
    );
};
