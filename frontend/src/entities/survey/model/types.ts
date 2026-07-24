// 설문 도메인 타입 — widgets/survey, features/submit-survey가 공유하는 단일 출처
export type SurveyAnswerValue = string | string[];

/** surveyId → 응답값 */
export type SurveyAnswers = Record<string, SurveyAnswerValue>;

export type SurveyQuestionType = "circle" | "list" | "text";

export interface SurveyQuestion {
    surveyId: string;
    title: string;
    type: SurveyQuestionType;
    questions?: {content: string}[];
    required?: boolean;
    mult?: boolean;
}
