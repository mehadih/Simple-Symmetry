'use client';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'
import {
    FacebookShareButton, InstapaperShareButton,
    TwitterShareButton,
} from "react-share";
import {Img} from "@/components/Img";
import gsap from "gsap";
import {useEffect, useRef} from "react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import ImageParallax from "@/components/ImageParallax";
import {primary} from "@/styles/globalStyleVars";
import Gallery from "@/components/project/Gallery";
import {useRouter} from 'next/navigation';
import reactHtmlParser from "react-html-parser";
import ProjectDescription from "@/components/project/ProjectDescription";

const MyComponent = ({data}) => {
    gsap.registerPlugin(ScrollTrigger);
    const leftWrapperRef = useRef(null);
    const rightWrapperRef = useRef(null);
    const router = useRouter();

    console.log('data', data)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const leftElement = leftWrapperRef.current;
        const rightElement = rightWrapperRef.current;

        if (typeof window !== 'undefined' && window.innerWidth >= 768 && leftElement && rightElement) {
            const rightHeight = rightElement.offsetHeight;
            const leftHeight = leftElement.offsetHeight;

            gsap.to(leftElement, {
                scrollTrigger: {
                    trigger: leftElement,
                    start: 'top +100',
                    end: () => `+=${Math.max(rightHeight - leftHeight, 100)}`,
                    pin: true,
                    pinSpacing: false
                }
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    console.log('project', data)
    return (
        <StyledComponent className="pt-160 pb-160 details">
            <Container>
                <Row>
                    <Col md={5} className={'details__left'}>
                        <div className={'details__left__wrapper'} ref={leftWrapperRef}>
                            <div onClick={() => router.back()} className={'back'} style={{cursor: 'pointer'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                                     fill="none">
                                    <path d="M13 7L0.999999 7" stroke="#CF0A0A" stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                    <path d="M7 1L1 7L7 13" stroke="#CF0A0A" stroke-width="1.5" stroke-linecap="round"
                                          stroke-linejoin="round"/>
                                </svg>
                                <p>Back</p>
                            </div>

                            <ul>
                                <li>
                                    {data?.data?.product_data?.type}
                                </li>
                                <li>
                                    {data?.data?.product_data?.location}
                                </li>
                            </ul>

                            <h1>{reactHtmlParser(data?.data?.product_data?.title)}</h1>

                            <div className={'share'}>
                                <p>share:</p>
                                <ul>
                                    <li><img src="/images/static/facebook.svg" alt=""/><FacebookShareButton
                                        url={typeof window !== 'undefined' && window.location.href}/></li>
                                    <li><img src="/images/static/twitter.svg" alt=""/> <TwitterShareButton
                                        url={typeof window !== 'undefined' && window.location.href}/></li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col md={7} className={'details__right'}>
                        <div className={'details__right_wrapper'} ref={rightWrapperRef}>
                            {data?.data?.posts?.list?.map((e) => {
                                if (e?.data?.template == "project_description") {
                                    return (
                                        <ProjectDescription data={e}/>
                                    );
                                } else if (e?.data?.template == "project_gallery") {
                                    return  <Gallery data={e}/>;
                                }
                            })}
                        </div>
                    </Col>
                </Row>
            </Container>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`

  .details {
    &__left {
      &__wrapper {
        .back {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 40px;

          p {
            color: ${primary};
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px; /* 150% */
          }
        }

        ul {
          display: flex;
          gap: 50px;
          margin-bottom: 10px;

          li {
            position: relative;
            color: #292929;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px; /* 142.857% */
            text-transform: uppercase;

            &:nth-child(2) {
              &:after {
                content: '';
                position: absolute;
                top: 20%;
                left: -30px;
                height: 10px;
                width: 10px;
                border-radius: 50%;
                background-color: ${primary};
              }
            }
          }
        }

        h1 {
          color: #292929;
          font-size: 40px;
          font-style: normal;
          font-weight: 400;
          line-height: 50px; /* 125% */
        }

        .share {
          margin-top: 40px;

          p {
            color: #292929;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px; /* 142.857% */
          }

          ul {
            display: flex;
            gap: 15px;
            margin-top: 15px;

            li {

              height: 25px;
              width: 25px;
              border-radius: 50%;
              //border: 1px solid black;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 10px;
              background-color: #292929;
              transition: background-color .5s ease;
              position: relative;

              &:after {
                display: none;
              }

              img {
                height: 10px;
                transition: .3s ease;
                filter: invert(95%) sepia(100%) saturate(44%) hue-rotate(256deg) brightness(234%) contrast(162%);
              }

              &:hover {
                background-color: ${primary};

                img {
                  filter: invert(95%) sepia(100%) saturate(44%) hue-rotate(256deg) brightness(234%) contrast(162%);
                }
              }

              button {
                position: absolute;
                inset: 0;
                z-index: 2;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    &__right {
      .banner {
        position: relative;
        overflow: hidden;
        padding-top: calc(400 / 670 * 100%);
        margin-bottom: 40px;
      }

      .desc {
        h5 {
          color: #292929;
          font-size: 24px;
          font-style: normal;
          font-weight: 400;
          line-height: 120%; /* 28.8px */
          margin-bottom: 30px;
        }

        p {
          color: #292929;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 24px; /* 150% */
          margin-bottom: 30px;
        }

        .img-wrapper {
          position: relative;
          overflow: hidden;
          padding-top: calc(380 / 670 * 100%);
          margin-bottom: 30px;
        }
      }
    }
  }


  @media(max-width: 767px){
    .details__left{
      margin-bottom: 40px;
    }
  }
`;

export default MyComponent;
