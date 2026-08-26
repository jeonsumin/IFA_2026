import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Home} from 'pages/home';
import {CheckIn} from 'pages/check-in';
import {Welcome} from 'pages/welcome';
import {Persona} from 'pages/persona';
import {Experience} from 'pages/experience';
import {PageLayout} from "../layout";
import {MobileOnlyView, BrowserView, TabletView} from 'react-device-detect'
import {RequireCheckIn, RedirectIfCheckedIn, RequireDraft} from "./guards";
import {Promotion} from "pages/promotion";
import {Report} from "pages/report";
import {QrScanner} from "pages/qr-scanner";
import {ModalProvider} from "app/provider/modal";
import {SuccessView} from "widgets/success-view";
import {ReportCard} from "widgets/report-card";

export const AppRouter = () => {

    // report-card 미리보기(개발용) — /routine-report 에서 카드 레이아웃 확인 (데스크톱·모바일 공용)
    const reportCardPreview = (
        <div className="flex min-h-screen items-center justify-center bg-lg-gray-3 p-4">
            <ReportCard
                ref={null}
                personaTitle="THE INDEPENDENT
                URBAN OPTIMIZER"
                personaDesc="혼자 살며 집을 효율적으로
관리하고 싶은 도시생활자"
                heroSrc="/images/report/hero_coordinator1.png"
                rows={Array.from({length: 4}, () => ({
                    label: "Entertainment in Tune",
                    situation: "LG StanbyME 2 Max",
                    desc: "나의 공간과 사운드가 ‘in tune’ 되는 순간.\n" +
                        "LG Sound Suite로 완성되는 프리미엄 홈 \n" +
                        "오디오를 경험해보세요.\n",
                }))}
            />
        </div>
    );

    return (
        <BrowserRouter>
            <ModalProvider>

                <BrowserView>
                    <Routes>
                        <Route path='/' element={<Promotion/>}/>
                        <Route path='/routine-report' element={reportCardPreview}/>
                        <Route path={'*'} element={<Navigate to="/" replace/>}/>
                    </Routes>
                </BrowserView>

                <TabletView>
                    <Routes>
                        <Route path='/' element={<Promotion/>}/>
                        <Route path={'*'} element={<Navigate to="/" replace/>}/>
                    </Routes>
                </TabletView>

                <MobileOnlyView>
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>

                        <Route element={<RequireCheckIn/>}>
                            <Route path={'/qr'} element={<QrScanner/>}/>
                        </Route>
                        <Route element={<PageLayout/>}>
                            {/* 인트로(공개) — 미체크인자도 봐야 체크인으로 진입 가능 */}

                            <Route element={<RedirectIfCheckedIn/>}>
                                <Route path={'/check-in'} element={<CheckIn/>}/>
                            </Route>
                            <Route element={<RequireDraft/>}>
                                <Route path={'/welcome'} element={<Welcome/>}/>
                                <Route path={'/persona'} element={<Persona/>}/>
                            </Route>
                            <Route element={<RequireCheckIn/>}>
                                <Route path={'/experience-success'} element={<SuccessView/>}/>
                                <Route path={'/dashboard'} element={<Experience/>}/>
                                <Route path={'/report'} element={<Report/>}/>
                            </Route>
                            <Route path={'*'} element={<Navigate to="/" replace/>}/>

                                <Route path={'/routine-report'} element={reportCardPreview}/>

                        </Route>
                    </Routes>
                </MobileOnlyView>
            </ModalProvider>
        </BrowserRouter>
    )
}
