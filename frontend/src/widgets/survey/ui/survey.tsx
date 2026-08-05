import {useState} from "react";
import {Button} from "shared/ui";
import type {SurveyAnswers} from "entities/survey";
import {surveyData} from "../model/survey";
import {CircleItem} from "./circle-item";
import {ButtonItem} from "./button-item";
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
        <div className='bg-bg-default'>
            <div className='flex flex-col items-center text-center gap-4'>

                <img
                    src="/images/welcome/cloi.png"
                    alt={'LG 클로이 로봇'}
                    className="w-[260px] max-w-full"
                />

                <p className='font-semibold text-black leading-6'>
                    This survey is designed to <br/>
                    collect feedback on your experience<br/>
                    at the LG booth during IFA 2026.<br/>
                    We kindly ask you to share<br/>
                    your honest opinions, which will be<br/>
                    used for internal purposes only.<br/>
                </p>

                <p className="text-sm leading-5 font-semibold">
                    ※ This survey consists of 5 questions.
                </p>
            </div>


            {surveyData.map((item) => {
                const error = showErrors && !!item.required && !isAnswered(answers[item.surveyId]);
                if (item.type === "circle") {
                    return (
                        <div className="bg-white rounded-md">
                            <CircleItem
                                key={item.surveyId}
                                title={item.title}
                                required={item.required}
                                error={error}
                                value={answers[item.surveyId] as string | undefined}
                                onChange={(v) => setAnswer(item.surveyId, v)}
                            />
                        </div>
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
