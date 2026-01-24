'use client';
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import {Img} from "../Img";
import {primary} from "@/styles/globalStyleVars";
import reactHtmlParser from "react-html-parser";

const AboutSection = ({data}) => {

    return (
        <StyledAboutSection className={`about-section pt-100 pb-100`}>
            <svg width="292" height="293" viewBox="0 0 292 293" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.681641 121.01L112.182 0.510254L133.682 1.51025L21.6816 121.01L125.682 232.51L136.682 220.01L43.6816 121.01L157.182 0.510254H176.182L64.1816 121.01L149.182 208.51L157.182 198.51L86.1816 121.01L97.6816 110.51L180.182 198.51L92.1816 292.01H69.6816L115.182 244.51L0.681641 121.01Z" stroke="#EAEAEA"/>
                <path d="M205.182 172.51L194.682 182.01L112.182 95.5103L199.682 1.51025H221.182L176.182 49.0103L291.182 172.51L180.182 292.01H157.182L269.682 169.51L165.182 61.0103L154.682 72.5103L248.682 172.51L136.682 292.01H115.182L226.182 172.51L143.182 86.0103L133.682 95.5103L205.182 172.51Z" stroke="#EAEAEA"/>
            </svg>
            <Container>
                <Row className='about-section__title'>
                    <Col>
                        <h2>{reactHtmlParser(data?.section_data?.subtitle)}</h2>
                    </Col>
                </Row>

                <Row className='about-section__content'>
                    <Col sm={8}>
                        <p>{reactHtmlParser(data?.section_data?.description)}</p>
                    </Col>
                </Row>

                {
                    data?.posts?.list?.length > 0 &&
                    <Row className={'about-section__services'}>
                        {
                            data?.posts?.list?.map((e,i)=>{
                                return(
                                    <Col className={'about-section__services__single'} md={4} key={i}>
                                        <div className={'about-section__services__single__wrapper'}>
                                            <svg className="border-svg" xmlns="http://www.w3.org/2000/svg">
                                                <rect className="border-rect-black" x="0" y="0" width="100%" height="100%" />
                                                <rect className="border-rect-red" x="0" y="0" width="100%" height="100%" />
                                            </svg>
                                            <div className="about-section__services__single__wrapper__top">
                                                <img src={e?.images?.[0]?.full_path} alt={e?.data?.title}/>
                                                <h4>{reactHtmlParser(e?.data?.title)}</h4>
                                            </div>
                                            <div className="about-section__services__single__wrapper__bottom">
                                                <p>{reactHtmlParser(e?.data?.short_desc)}</p>
                                            </div>
                                        </div>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                }
            </Container>
        </StyledAboutSection>
    );
};

const StyledAboutSection = styled.section`
  position: relative;
  overflow: hidden;
  z-index: 4;

  svg{
    position: absolute;
    top: 20px;
    bottom: 20px;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 35%;
  }

  .about-section__title {
    margin-bottom: 40px;

    h2 {
      font-size: 32px;
      line-height: 36px;

      span {
        color: ${primary};
      }
    }
  }

  .about-section__content {

    p {
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 16px;

      &:nth-last-of-type(1) {
        margin-bottom: 0;
      }
    }
  }

  .about-section__services{
    margin-top: 60px;
    &__single{
      padding-bottom: 30px;
      cursor: pointer;
      &:nth-last-child(-n + 3){
        padding-bottom: 0;
      }
      &__wrapper{
        position: relative;
        padding: 30px;
        background: transparent;

        .border-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: unset !important;

          .border-rect-black {
            fill: none;
            stroke: #000000;
            stroke-width: 1;
            opacity: 1;
            transition: opacity 0.8s ease-in-out;
          }

          .border-rect-red {
            fill: none;
            stroke: ${primary};
            stroke-width: 3;
            stroke-dasharray: 1012;
            stroke-dashoffset: 1012;
            transition: stroke-dashoffset 0.8s ease-in-out;
          }
        }

        &:hover {
          .border-rect-black {
            opacity: 0;
          }

          .border-rect-red {
            stroke-dashoffset: 0;
          }
        }

        &__top{
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 30px;
          img{
            width: 56px;
            height: 56px;
            filter: invert(22%) sepia(73%) saturate(5942%) hue-rotate(354deg) brightness(80%) contrast(105%);
          }
          h4{
            font-size: 24px;
            line-height: 28px;
            font-weight: 600;
          }
        }
        &__bottom{
          position: relative;
          z-index: 1;

          p{
            font-size: 16px;
            line-height: 20px;
            margin-top: 20px;
          }
        }
      }
      
      
      @media(max-width: 767px){
        &:nth-last-child(-n+3){
          padding-bottom: 30px;
        }
        &:last-child{
          padding-bottom: 0;
        }
      }
    }
  }


  @media (max-width: 900px) {
    .global-image img {
      height: 100% !important;
      bottom: 0 !important;
    }
  }


  @media (max-width: 767px) {
    .about-section {
      &__title {
        margin-bottom: 60px;
      }

      &__content {
        .col-sm-3, .col-sm-8 {
          min-width: 100%;
          margin: 0;
        }

        img {
          margin-bottom: 60px;
          width: 80%;
        }
      }
    }
  }


`;
export default AboutSection;