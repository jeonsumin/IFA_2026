import {useState} from "react";
import type {SurveyAnswers} from "entities/survey";
import {submitSurvey} from "../api/submit-survey";

// 제출 API를 loading/error 상태와 함께 감싼 훅
export const useSubmitSurvey = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async (answers: SurveyAnswers): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await submitSurvey(answers);
            return true;
        } catch (e) {
            setError(e instanceof Error ? e.message : "제출에 실패했습니다.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {submit, loading, error};
};
