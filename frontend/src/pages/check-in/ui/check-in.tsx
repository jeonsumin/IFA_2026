import {useNavigate} from "react-router-dom";
import {Button, Checkbox, Input, Select} from "shared/ui";
import {Field} from "shared/ui/field";
import {useUserDraft} from "entities/user";
import {AGE_OPTIONS, GENDER_OPTIONS} from '../model/options';
import {useCheckInForm} from '../model/use-check-in-form';
import {useModal} from "app/provider/modal";
import {useTranslate} from "app/provider/lang";
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
    const {openFullPage} = useModal();
    const setDraft = useUserDraft((s) => s.setDraft);
    const {t} = useTranslate();
    const navigate = useNavigate();

    // 카피덱 키(labelKey) → 표시 문자열
    const genderOptions = GENDER_OPTIONS.map((o) => ({label: t(o.labelKey), value: o.value}));
    const ageOptions = AGE_OPTIONS.map((o) => ({label: t(o.labelKey), value: o.value}));

    const openModal = () => {
        setAgree(true)
        openFullPage(
            {
                title: t('checkIn.privacyTitle'),
                content: <PrivacyMarkup/>
            }
        )
    }

    // 다음: 폼을 draft에 저장하고 persona로 이동. 실제 제출은 persona에서 한 번에.
    const handleNext = () => {
        setDraft(values);
        navigate("/welcome");
    };

    return (
        <div className="flex min-h-full flex-col bg-bg-default pt-10">
            <div className="flex flex-col items-center gap-10 px-5">
                <h1 className="w-full text-center text-xl font-bold text-black">
                    {t('checkIn.title')}
                </h1>

                <div className="w-full rounded-lg border border-white bg-white/40">
                    <div className="flex flex-col gap-4 px-5 py-6">
                        <Field label={t('checkIn.nameLabel')} error={touched.name ? errors.name : ""}>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={() => touch("name")}
                                maxLength={15}
                                error={!!(touched.name && errors.name)}
                                aria-label={t('checkIn.nameAria')}
                                placeholder={t('checkIn.namePlaceholder')}
                                className={`${controlClass} tracking-[-0.32px] placeholder:text-placeholder`}
                            />
                        </Field>

                        <Field label={t('checkIn.emailLabel')} error={touched.email ? errors.email : ""}>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => touch("email")}
                                error={!!(touched.email && errors.email)}
                                aria-label={t('checkIn.emailAria')}
                                placeholder={t('checkIn.emailPlaceholder')}
                                className={`${controlClass} tracking-[-0.32px] placeholder:text-placeholder`}
                            />
                        </Field>

                        <Field label={t('checkIn.genderLabel')} error={touched.gender ? errors.gender : ""}>
                            <Select
                                options={genderOptions}
                                value={gender}
                                onValueChange={setGender}
                                name="gender"
                                onBlur={touch}
                                placeholder={t('common.selectPlaceholder')}
                                className={controlClass}
                            />
                        </Field>

                        <Field label={t('checkIn.ageLabel')} error={touched.age ? errors.age : ""}>
                            <Select
                                options={ageOptions}
                                value={age}
                                onValueChange={setAge}
                                name="age"
                                onBlur={touch}
                                placeholder={t('common.selectPlaceholder')}
                                className={controlClass}
                            />
                        </Field>
                    </div>

                    <div className="flex items-start gap-2 rounded-b-lg bg-white px-5 py-6">
                        <Checkbox
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            aria-label={t('checkIn.agreeAria')}
                            className="h-5 w-5"
                        />
                        <div className="flex flex-1 flex-col gap-2" onClick={openModal}>
                            <p className="text-base font-semibold text-black underline tracking-[-0.32px]">
                                {t('checkIn.agreeRequired')}
                            </p>
                            <p className="text-[12px] leading-[1.3] tracking-[-0.2px] text-lg-gray-2">
                                {t('checkIn.agreeNote')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto px-5 pt-6 pb-10">
                {/* 비활성 시 디자인대로 그라데이션 대신 solid 회색(#999) */}
                <Button disabled={!valid && !import.meta.env.DEV} onClick={handleNext}>
                    {t('common.next')}
                </Button>
            </div>
        </div>
    );
};
