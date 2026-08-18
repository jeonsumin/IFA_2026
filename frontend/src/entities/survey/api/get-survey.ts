import {request} from "shared/api";
import type {SurveyQuestion} from "../model/types";

// GET /survey/ — 설문 정의 조회 (끝 슬래시: Apache DirectorySlash 301 리다이렉트 회피)
export const getSurvey = async (): Promise<SurveyQuestion[]> => {
    const {data} = await request.get<SurveyQuestion[]>("/survey/");
    return data;
};
