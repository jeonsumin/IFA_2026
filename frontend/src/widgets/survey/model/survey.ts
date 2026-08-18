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
        img:"/images/survey/survey_q2.png"
    },
    {
        surveyId: "Q3",
        titleKey: "survey.q3.title",
        type: "list",
        mult: true,
        required: true,
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
        mult: true,
        required: true,
        questions: [
            {img: "/images/survey/survey_q4_0.png", contentKey: "survey.q4.options.0"},
            {img: "/images/survey/survey_q4_0.png", contentKey: "survey.q4.options.1"},
            {img: "/images/survey/survey_q4_0.png", contentKey: "survey.q4.options.2"},
            {img: "/images/survey/survey_q4_0.png", contentKey: "survey.q4.options.3"},
            {img: "/images/survey/survey_q4_0.png", contentKey: "survey.q4.options.4"},
            {img: "/images/survey/survey_q4_0.png", contentKey: "survey.q4.options.5"},
            {img: "/images/survey/survey_q4_0.png", contentKey: "survey.q4.options.6"},
            {img: "/images/survey/survey_q4_0.png", contentKey: "survey.q4.options.7"},
            {img: "/images/survey/survey_q4_0.png", contentKey: "survey.q4.options.8"},
            {img: "/images/survey/survey_q4_0.png", contentKey: "survey.q4.options.9"},
            {img: "/images/survey/survey_q4_0.png", contentKey: "survey.q4.options.10"},
        ]
    },
    {
        surveyId: "Q5",
        titleKey: "survey.q5.title",
        required: true,
        type: "text",
    }
];
