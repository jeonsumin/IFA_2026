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

    return (
        <BrowserRouter>
            <ModalProvider>

                <BrowserView>
                    <Routes>
                        <Route path='/' element={<Promotion/>}/>
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

                                <Route path={'/routine-report'} element={   <ReportCard
                                    ref={null}
                                    personaTitle={`persona.coordinator.title`}
                                    personaDesc={`persona.coordinator.desc`}
                                    heroSrc={`/images/report/hero_coordinator.png`}
                                    rows={[
                                        {
                                            "label": "Entertainment in Tune",
                                            "situation": "LG Sound Suite",
                                            "desc": "나의 공간과 사운드가 ‘in tune’ 되는 순간.\n" +
                                                "LG Sound Suite로 완성되는 프리미엄 홈 오디오를 경험해보세요.\n"
                                        },
                                        {
                                            "label": "Entertainment in Tune",
                                            "situation": "LG Sound Suite",
                                            "desc": "나의 공간과 사운드가 ‘in tune’ 되는 순간.\n" +
                                                "LG Sound Suite로 완성되는 프리미엄 홈 오디오를 경험해보세요.\n"
                                        },
                                        {
                                            "label": "Entertainment in Tune",
                                            "situation": "LG Sound Suite",
                                            "desc": "나의 공간과 사운드가 ‘in tune’ 되는 순간.\n" +
                                                "LG Sound Suite로 완성되는 프리미엄 홈 오디오를 경험해보세요.\n"
                                        },
                                        {
                                            "label": "Entertainment in Tune",
                                            "situation": "LG Sound Suite",
                                            "desc": "나의 공간과 사운드가 ‘in tune’ 되는 순간.\n" +
                                                "LG Sound Suite로 완성되는 프리미엄 홈 오디오를 경험해보세요.\n"
                                        }
                                    ]}
                                />}/>

                        </Route>
                    </Routes>
                </MobileOnlyView>
            </ModalProvider>
        </BrowserRouter>
    )
}
