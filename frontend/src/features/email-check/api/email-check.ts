import {request} from "shared/api";

export const emailCheck = async (payload: string): Promise<any> => {
    const {data} = await request.post<any>("email-check", {email: payload});

    return data;
}
