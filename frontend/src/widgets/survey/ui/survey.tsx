import {useState} from "react";
import {useTranslate} from "app/provider/lang";
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
    const {t} = useTranslate();
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
                        alt={t('common.robotAlt')}
                        className="w-40 max-w-full"
                    />

                    <p className="whitespace-pre-line text-sm leading-relaxed text-state-text-body">
                        {t('survey.intro')}
                    </p>

                    <p className="text-sm font-semibold text-state-text-body">
                        {t('survey.questionCount')}
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
                                <p className="whitespace-pre-line text-base tracking-tight text-black">
                                    {t(item.titleKey)}
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
                                    questions={(item.questions ?? []).map((q) => ({
                                        content: t(q.contentKey),
                                    }))}
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
                    {t('survey.submit')}
                </Button>
            </div>
        </div>
    );
};
