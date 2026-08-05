import {useState} from "react";
import {is} from "shared/lib/validator";
import {useTranslate} from "app/provider/lang";
import type {CheckInPayload} from "entities/user";

// 검증 체크들을 순서대로 실행, 첫 실패 메시지 반환
const firstError = (value: string, checks: ((v: string, f: any) => string | false)[]) => {
    for (const check of checks) {
        const msg = check(value, {});
        if (msg) return msg;
    }
    return "";
};

// 체크인 폼 상태 + 검증 (pages/check-in 전용)
export const useCheckInForm = () => {
    const {t} = useTranslate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState<string>();
    const [age, setAge] = useState<string>();
    const [agree, setAgree] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const touch = (key: string) => setTouched((t) => ({...t, [key]: true}));

    const errors = {
        name: firstError(name, [
            is.match((v: string) => !!v.trim(), t("validation.nameRequired")),
            is.match((v: string) => v.length <= 8, t("validation.nameMax")),
        ]),
        email: firstError(email, [
            is.match((v: string) => !!v.trim(), t("validation.emailRequired")),
            is.email(t("validation.emailInvalid")),
        ]),
        gender: firstError(gender ?? "", [is.match((v: string) => !!v, t("validation.genderRequired"))]),
        age: firstError(age ?? "", [is.match((v: string) => !!v, t("validation.ageRequired"))]),
    };

    const valid = !errors.name && !errors.email && !errors.gender && !errors.age && agree;

    // 제출 payload (도메인 타입)
    const values: CheckInPayload = {name, email, gender: gender ?? "", age: age ?? "", agree};

    return {
        name, setName,
        email, setEmail,
        gender, setGender,
        age, setAge,
        agree, setAgree,
        touched, touch,
        errors, valid, values,
    };
};
