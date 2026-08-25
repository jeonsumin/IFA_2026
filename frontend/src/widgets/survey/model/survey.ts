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
            {img: "/images/survey/survey_q4_1.png", contentKey: "survey.q4.options.1"},
            {img: "/images/survey/survey_q4_2.png", contentKey: "survey.q4.options.2"},
            {img: "/images/survey/survey_q4_3.png", contentKey: "survey.q4.options.3"},
            {img: "/images/survey/survey_q4_4.png", contentKey: "survey.q4.options.4"},
            {img: "/images/survey/survey_q4_5.png", contentKey: "survey.q4.options.5"},
            {img: "/images/survey/survey_q4_6.png", contentKey: "survey.q4.options.6"},
            {img: "/images/survey/survey_q4_7.png", contentKey: "survey.q4.options.7"},
            {img: "/images/survey/survey_q4_8.png", contentKey: "survey.q4.options.8"},
            {img: "/images/survey/survey_q4_9.png", contentKey: "survey.q4.options.9"},
            {img: "/images/survey/survey_q4_10.png", contentKey: "survey.q4.options.10"},
            {img: "/images/survey/survey_q4_11.png", contentKey: "survey.q4.options.11"},
            {img: "/images/survey/survey_q4_12.png", contentKey: "survey.q4.options.12"},
            {img: "/images/survey/survey_q4_13.png", contentKey: "survey.q4.options.13"},
            {img: "/images/survey/survey_q4_14.png", contentKey: "survey.q4.options.14"},
            {img: "/images/survey/survey_q4_15.png", contentKey: "survey.q4.options.15"},
            {img: "/images/survey/survey_q4_16.png", contentKey: "survey.q4.options.16"},
        ]
    },
    {
        surveyId: "Q5",
        titleKey: "survey.q5.title",
        required: true,
        type: "text",
    }
];
