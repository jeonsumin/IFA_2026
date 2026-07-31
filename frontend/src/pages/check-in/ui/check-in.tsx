import {useNavigate} from "react-router-dom";
import {Button, Checkbox, Input, Select} from "shared/ui";
import {Field} from "shared/ui/field";
import {useSubmitCheckIn} from "features/submit-check-in";
import {AGE_OPTIONS, GENDER_OPTIONS} from '../model/options';
import {useCheckInForm} from '../model/use-check-in-form';
import {useModal} from "app/provider/modal";
import {PrivacyMarkup} from "widgets/privacy";

// 디자인상 필드는 흰 배경 + 무테두리 + rounded-8 + p-16
const controlClass = "w-full rounded-lg border-transparent bg-white p-4 text-base";

export const CheckIn = () => {
    const {
        name, setName,
        email, setEmail,
        gender, setGender,
        age, setAge,
        agree, setAgree,
        touched, touch,
        errors, valid, values,
    } = useCheckInForm();
    const {openFullPage, openAlert} = useModal();
    const {submit} = useSubmitCheckIn();
    const navigate = useNavigate();

    const openModal = () => {
        setAgree(true)
        openFullPage(
            {
                title: '개인정보 수집 및 이용 동의',
                content: <PrivacyMarkup/>
            }
        )
    }

    // 다음: 체크인 제출(features/submit-check-in) 성공 시 persona 화면으로 이동
    const handleNext = async () => {
        const ok = await submit(values);
        if (ok) navigate("/persona");
        else openAlert({message: "저장에 실패했습니다. 잠시 후 다시 시도해주세요."});
    };

    return (
        <div className="flex min-h-full flex-col bg-bg-default pt-10">
            <div className="flex flex-col items-center gap-10 px-5">
                <h1 className="w-full text-center text-xl font-bold text-black">
                    당신에 대해 알려주세요.
                </h1>

                <div className="w-full rounded-lg border border-white bg-white/40">
                    <div className="flex flex-col gap-4 px-5 py-6">
                        <Field label="이름 (최대 8자 이내)" error={touched.name ? errors.name : ""}>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => touch("name")}
                                maxLength={8}
                                error={!!(touched.name && errors.name)}
                                aria-label="이름"
                                placeholder="이름을 입력합니다"
                                className={`${controlClass} tracking-[-0.32px] placeholder:text-placeholder`}
                            />
                        </Field>

                        <Field label="이메일" error={touched.email ? errors.email : ""}>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => touch("email")}
                                error={!!(touched.email && errors.email)}
                                aria-label="이메일"
                                placeholder="이메일을 입력합니다"
                                className={`${controlClass} tracking-[-0.32px] placeholder:text-placeholder`}
                            />
                        </Field>

                        <Field label="성별" error={touched.gender ? errors.gender : ""}>
                            <Select
                                options={GENDER_OPTIONS}
                                value={gender}
                                onValueChange={setGender}
                                name="gender"
                                onBlur={touch}
                                placeholder="선택해주세요"
                                className={controlClass}
                            />
                        </Field>

                        <Field label="연령" error={touched.age ? errors.age : ""}>
                            <Select
                                options={AGE_OPTIONS}
                                value={age}
                                onValueChange={setAge}
                                name="age"
                                onBlur={touch}
                                placeholder="선택해주세요"
                                className={controlClass}
                            />
                        </Field>
                    </div>

                    <div className="flex items-start gap-2 rounded-b-lg bg-white px-5 py-6">
                        <Checkbox
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            aria-label="개인정보 수집 및 이용 동의"
                            className="h-5 w-5"
                        />
                        <div className="flex flex-1 flex-col gap-2" onClick={openModal}>
                            <p className="text-base font-semibold text-black underline tracking-[-0.32px]">
                                (필수) 개인정보 수집 및 이용 동의
                            </p>
                            <p className="text-[10px] leading-[1.4] tracking-[-0.2px] text-lg-gray-2">
                                본 정보는 1달 뒤 폐기되며 LG 전자 내부 자료로만 활용 됩니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto px-5 pt-12 pb-15">
                {/* 비활성 시 디자인대로 그라데이션 대신 solid 회색(#999) */}
                <Button disabled={!valid} onClick={handleNext} className={!valid ? "bg-none bg-disable" : undefined}>
                    다음
                </Button>
            </div>
        </div>
    );
};
