import {request} from "shared/api";
import type {SurveyAnswers} from "entities/survey";

// POST /survey — 설문 답변 제출 (body: {answers})
export const submitSurvey = (answers: SurveyAnswers): Promise<void> =>
    request.post("/survey", {answers});
