import {request} from "shared/api";

export type LogRequest = {
    target: string;
}
export const submitLog = async (payload: string): Promise<any> => {
    const {data} = await request.post<any>("system-log", {target: payload});

    return data;
}
