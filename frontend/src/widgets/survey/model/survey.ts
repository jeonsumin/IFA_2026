import type {SurveyQuestion} from "entities/survey";

export const surveyData: SurveyQuestion[] = [
    {
        surveyId: "Q1",
        title: "How satisfied are you with your visit \n to the LG Booth?",
        type: "circle",
        required: true
    },
    {
        surveyId: "Q2",
        title: "Which zone of the booth do you like \n the most ",
        type: "list",
        questions: [
            {content: "Attractor"},
            {content: "Entertainment in Tune"},
            {content: "Living in Tune"},
            {content: "Harmony in Tune"},
            {content: "Elegance in Tune"},
        ],
        required: true,
    },
    {
        surveyId: "Q3",
        title: "Which aspects of the booth are you most satisfied with? (Multi-select)",
        type: "list",
        questions: [
            {content: 'Overall booth design & atmosphere'},
            {content: 'New LG AI Appliances for European living'},
            {content: 'LG AI Appliances Orchestra Showcase (Hero Stage)'},
            {content: 'Find Your Routine in Tune (Mobile experience)'},
        ]

    },
    {
        surveyId: "Q4",
        title: "Which products impressed you most? (Multi-select)",
        type: "list",
        questions: [
            {content: 'LG Best TV, Gallery TV'},
            {content: 'UltraGear'},
            {content: 'StanbyME 2 Max'},
            {content: 'Sound Suite, xboom'},
            {content: 'WebOS'},
            {content: 'LG Fit&Max Refrigerator'},
            {content: 'LG Fit&Max Laundry'},
            {content: 'LG Fit&Max Dishwasher'},
            {content: 'LG SIGNATURE Refrigerator'},
            {content: 'LG SIGNATURE OLED T'},
            {content: 'LG SIGNATURE Laundry '},

        ]
    },
    {
        surveyId: "Q5",
        title: "What experience are you most looking forward to at the LG IFA 2027 exhibition?",
        type: "text",
    }
];
