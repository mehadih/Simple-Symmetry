'use client'
import "/app/global.css";
import StyledComponentsRegistry from "@/lib/registry";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import GlobalStyle from "@/styles/globalStyle";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollSmoother} from "gsap/ScrollSmoother";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

export default function RootLayout({children}) {

    const location = usePathname();
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
    const [bgColor, setBGColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#ffffff');

    useEffect(() => {
        if (location.startsWith('/news-media/')) {
            setBGColor('#292929');
            setTextColor('#fff');
        } else {
            setBGColor('transparent');
            setTextColor('#ffffff');
        }
    }, [location]);

    const wrapperRef = useRef();
    const contentRef = useRef();
    let smoother;

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth > 767) {
            smoother = ScrollSmoother.create({
                wrapper: wrapperRef.current,
                content: contentRef.current,
                smooth: 2,
                effects: true,
                smoothTouch: 0.1
            });
        }
        ScrollTrigger.refresh();
        return () => {
            if (smoother) smoother.kill();
        };
    }, [location]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash) {
            gsap.to(window, {duration: .7, scrollTo: window.location.hash});
        }
    });

    useEffect(() => {
        gsap.to(window, {duration: 0, scrollTo: 0});
    }, [location]);


    useGSAP(() => {
        document.querySelector(".scroll-down")?.addEventListener("click", (e) => {
            e.preventDefault();
            smoother.scrollTo("#overview", true, "top -100px", { duration: 1 });
        });
    }, []);


    return (
        <html lang="en">
        <head>
            <link rel="icon" type="image/png" href="/images/static/favicon.png"/>
            <meta content="#000000" name="theme-color"/>
        </head>
        <body>
        <StyledComponentsRegistry>
            <GlobalStyle/>
            <ToastContainer/>
            <Menu/>
            <div ref={wrapperRef} id="smooth-wrapper">
                <div ref={contentRef} id="smooth-content">
                    {children}
                    <Footer/>
                </div>
            </div>

        </StyledComponentsRegistry>
        </body>
        </html>
    );
}
