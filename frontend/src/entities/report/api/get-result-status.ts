import {ReportStatus} from "../model/types.ts";
import {request} from "shared/api";

export const getResultStatus = async (): Promise<ReportStatus> => {
    const {data} = await request.post<{ success: boolean, data: ReportStatus }>("/result-status");

    return data.data;
}
