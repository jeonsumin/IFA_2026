// 설문 도메인 타입 — widgets/survey, features/submit-survey가 공유하는 단일 출처
export type SurveyAnswerValue = string | string[];

/** surveyId → 응답값 */
export type SurveyAnswers = Record<string, SurveyAnswerValue>;

export type SurveyQuestionType = "circle" | "list" | "text";

export interface SurveyQuestion {
    surveyId: string;
    titleKey: string; // 카피덱 키 (survey.<qid>.title) → 렌더에서 t()로 해석
    type: SurveyQuestionType;
    questions?: {contentKey: string}[]; // 카피덱 키 (survey.<qid>.options.<i>)
    required?: boolean;
    mult?: boolean;
}
