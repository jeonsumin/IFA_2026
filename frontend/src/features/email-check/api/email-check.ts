import {request} from "shared/api";

export const emailCheck = async (payload: string): Promise<any> => {
    // 중복(success:false, 409)은 전역 홈 리디렉션 대신 check-in 페이지에서 필드 에러로 처리
    const {data} = await request.post<any>("email-check", {email: payload}, {skipHandleFail: true});

    return data;
}
