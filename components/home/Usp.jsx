'use client';
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {primary} from "@/styles/globalStyleVars";
import Link from 'next/link';
import topImg1 from '../../public/images/static/circle.svg'
import topImg2 from '../../public/images/static/circle.svg'
import topImg3 from '../../public/images/static/circle.svg'
import topImg4 from '../../public/images/static/circle.svg'
import aboutImg from '../../public/images/dynamic/usp-min.jpg'
import {Img} from "../Img";
import {BsPlus} from 'react-icons/bs';
import {Col, Container, Row} from "react-bootstrap";
import reactHtmlParser from "react-html-parser";

const UspSection = ({data}) => {
    const [winWidth, setWinWidth] = useState(true)

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth > 800) {
            setWinWidth(true)
        } else {
            setWinWidth(false)
        }
        window.addEventListener("resize", () => {
            if (typeof window !== 'undefined' && window.innerWidth > 800) {
                setWinWidth(true)
            } else {
                setWinWidth(false)
            }
        });
    }, [])


    return (
        <StyledAboutSection className={`about-section`}>
            <Container fluid className='about-section__bottom'>
                <Row>
                    {
                        data?.posts?.list && data?.posts?.list?.length > 0 &&
                        data?.posts?.list?.map((e,i) =>{
                            return(
                                <Col sm={3} className='about-section__bottom__single p-0'>
                                    <div className="about-section__bottom__single__inner">
                                        {/*<Link href={'/board-of-directors'}></Link>*/}
                                        <div className="about-section__bottom__single__inner__img">
                                            <Img src={e?.images?.[0]?.full_path} alt={e?.data?.title}/>
                                        </div>

                                        <img className='img-top' src={topImg1} alt=""/>
                                        <div className="circle">
                                            <BsPlus/>
                                        </div>
                                        <p>{reactHtmlParser(e?.data?.description)}</p>
                                        <h4>{reactHtmlParser(e?.data?.title)}</h4>
                                    </div>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        </StyledAboutSection>
    );
};

const StyledAboutSection = styled.section`
  position: relative;
  z-index: 4;

  .about-section__bottom {
    &__single {
      &__inner {
        position: relative;
        padding-top: calc(350 / 341 * 100%);
        overflow: hidden;
        border-right: 1px solid #FFF;

        &:after {
          content: '';
          background-color: rgba(0, 0, 0, 0.85);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          width: 100%;
          transition: .4s ease;
          //mix-blend-mode: multiply;
        }

        a {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0px;
          z-index: 5;
        }

        &__img {
          &:after {
            content: '';
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${primary};
            mix-blend-mode: multiply;
            opacity: 0;
            transition: .2s ease;
            transition-delay: .3s;
          }
        }

        p {
          position: absolute;
          left: 30px;
          right: 30px;
          top: 30px;
          color: #ffffff;
          font-size: 16px;
          line-height: 22px;
          transform: translateY(-100%);
          transition: all .5s ease;
          opacity: 0;
        }

        .img-top {
          position: absolute;
          top: 40px;
          left: 30px;
          z-index: 2;
          opacity: 1;
          transition: .3s ease;
          height: 60px;
        }

        .circle {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          height: 50px;
          width: 50px;
          border: 1px solid #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          opacity: 1;
          transition: .3s ease;

          svg {
            color: #ffffff;
            font-size: 25px;
            transition: .3s ease;
          }
        }

        h4 {
          position: absolute;
          bottom: 30px;
          left: 30px;
          right: 30px;
          font-size: 24px;
          line-height: 32px;
          color: #ffffff;
          z-index: 2;
        }

      }

      &:hover {
        .about-section__bottom__single__inner {
          &:after {
            height: 0;
          }

          p {
            transform: none;
            opacity: 1;
          }

          &__img:after {
            opacity: 1;
            transition-delay: 0s;
          }

          .img-top {
            transform: translateY(-20px);
            opacity: 0;
          }

          .circle {
            transform: scale(1.9);
            opacity: 0;

            svg {
              transform: rotate(50deg);
            }
          }

        }

      }
    }
  }


  @media (min-width: 951px) and (max-width: 1200px) {
    .about-section__bottom__single__inner {
      h4 {
        font-size: 20px;
        line-height: 25px;
      }
    }
  }

  @media (max-width: 950px) {
    .about-section__bottom__single {
      flex: 0 0 50%;
      max-width: 50%;
    }

    .texts-section__repeat-text {
      .col-sm-3 {
        min-width: 33.3333%;
      }
    }
  }

  @media (max-width: 900px) {
    .global-image img {
      height: 100% !important;
      bottom: 0 !important;
    }

    .mission-vision {
      padding-top: 160px;
      padding-bottom: 160px;
      height: auto !important;

      .row {
        position: relative !important;
        margin-top: -300px !important;
        margin-right: -15px;
        margin-left: -15px;
      }

      .col-sm-4 {
        min-width: 100%;
        margin-bottom: 30px;

        &:nth-last-child(1) {
          margin-bottom: 0;
        }
      }
    }
  }

  @media (max-width: 650px) {
    .about-section__bottom {
      margin-top: 40px;

      &__single {
        flex: 0 0 100%;
        max-width: 100%;

        &__inner {
          border: none;

          h4 {
            font-size: 20px;
            line-height: 26px;
          }
        }
      }
    }
  }
`;
export default UspSection;
