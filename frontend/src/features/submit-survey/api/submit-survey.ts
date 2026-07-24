import {request} from "shared/api";
import type {SurveyAnswers} from "entities/survey";

// POST /survey/submit — 설문 답변 제출
export const submitSurvey = (answers: SurveyAnswers): Promise<void> =>
    request.post("/survey/submit", {answers});
