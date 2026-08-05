import type {SurveyQuestion} from "entities/survey";

// 카피는 카피덱(survey.*)에 저장, 렌더에서 t()로 해석
export const surveyData: SurveyQuestion[] = [
    {
        surveyId: "Q1",
        titleKey: "survey.q1.title",
        type: "circle",
        required: true
    },
    {
        surveyId: "Q2",
        titleKey: "survey.q2.title",
        type: "list",
        questions: [
            {contentKey: "survey.q2.options.0"},
            {contentKey: "survey.q2.options.1"},
            {contentKey: "survey.q2.options.2"},
            {contentKey: "survey.q2.options.3"},
            {contentKey: "survey.q2.options.4"},
        ],
        required: true,
    },
    {
        surveyId: "Q3",
        titleKey: "survey.q3.title",
        type: "list",
        questions: [
            {contentKey: "survey.q3.options.0"},
            {contentKey: "survey.q3.options.1"},
            {contentKey: "survey.q3.options.2"},
            {contentKey: "survey.q3.options.3"},
        ]
    },
    {
        surveyId: "Q4",
        titleKey: "survey.q4.title",
        type: "list",
        questions: [
            {contentKey: "survey.q4.options.0"},
            {contentKey: "survey.q4.options.1"},
            {contentKey: "survey.q4.options.2"},
            {contentKey: "survey.q4.options.3"},
            {contentKey: "survey.q4.options.4"},
            {contentKey: "survey.q4.options.5"},
            {contentKey: "survey.q4.options.6"},
            {contentKey: "survey.q4.options.7"},
            {contentKey: "survey.q4.options.8"},
            {contentKey: "survey.q4.options.9"},
            {contentKey: "survey.q4.options.10"},
        ]
    },
    {
        surveyId: "Q5",
        titleKey: "survey.q5.title",
        type: "text",
    }
];
