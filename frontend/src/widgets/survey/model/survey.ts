type SurveyType = {
    surveyId: string;
    title: string;
    type: "circle" | "list" | "text";
    questions?: { content: string }[];
    required?: boolean;
    mult?: boolean;
};

export const surveyData: SurveyType[] = [
    {
        surveyId: "Q1",
        title: "009_survey01_001",
        type: "circle",
        required: true
    },
    {
        surveyId: "Q2",
        title: "009_survey02_001",
        type: "list",
        questions: [
            {content: "009_survey02_002"},
            {content: "009_survey02_003"},
            {content: "009_survey02_004"},
            {content: "009_survey02_005"},
        ],
        required: true,
    },
    {
        surveyId: "Q3",
        title: "009_survey03_001",
        type: "circle",
        required: true,
    },
    {
        surveyId: "Q4",
        title: "009_survey04_001",
        type: "circle",
        required: true,
    },
    {
        surveyId: "Q5",
        title: "009_survey05_001",
        type: "circle",
        required: true,
    },
    {
        surveyId: "Q6",
        title: "009_survey06_001",
        type: "circle",
        required: true,
    },
    {
        surveyId: "Q7",
        title: "009_survey07_001",
        type: "list",
        questions: [
            {content: "009_survey06_002"},
            {content: "009_survey06_003"},
            {content: "009_survey06_004"},
        ],
        required: true,
    },
    {
        surveyId: "Q8",
        title: "009_survey08_001",
        type: "list",
        questions: [
            {content: "009_survey08_002"},
            {content: "009_survey08_003"},
            {content: "009_survey08_004"},
            {content: "009_survey08_005"},
        ],
        required: true,
    },
    {
        surveyId: "Q9",
        title: "009_survey09_001",
        type: "list",
        questions: [
            {content: "009_survey09_002"},
            {content: "009_survey09_003"},
            {content: "009_survey09_004"},
            {content: "009_survey09_005"},
            {content: "009_survey09_006"},
        ],
        required: true,
    },
    {
        surveyId: "Q10",
        title: "009_survey10_001",
        type: "list",
        questions: [
            {content: "009_survey10_002"},
            {content: "009_survey10_003"},
            {content: "009_survey10_004"},
            {content: "009_survey10_005"},
            {content: "009_survey10_006"},
        ],
        required: true,
    },
    {
        surveyId: "Q11",
        title: "009_survey11_001",
        type: "list",
        questions: [
            {content: "009_survey11_002"},
            {content: "009_survey11_003"},
            {content: "009_survey11_004"},
            {content: "009_survey11_005"},
            {content: "009_survey11_006"},
        ],
        required: true,
    },
    {
        surveyId: "Q12",
        title: "009_survey12_001",
        type: "text",
        required: false,
    }
];
