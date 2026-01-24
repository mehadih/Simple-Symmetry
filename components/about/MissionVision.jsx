'use client';
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import {Img} from "@/components/Img";
import reactHtmlParser from "react-html-parser";

const Mission = ({data}) => {

    const [offset, setOffset] = useState();
    useEffect(() => {
        setOffset(document.querySelector(" .container").offsetLeft);
    }, []);

    return (

        <StyledDetail className={'mission-vision pb-160'}>
            <Container>
                <Row>
                    <Col md={6}>
                        <div className="mission-vision__content">
                            <div className="mission-vision__content__upper">
                                <h3 className={'split-up'}>{reactHtmlParser(data?.posts?.list?.[0]?.data?.title)}</h3>
                                <p className={'split-up'} >{reactHtmlParser(data?.posts?.list?.[0]?.data?.description)}</p>
                            </div>
                            <div className="mission-vision__content__lower">
                                <h3 className={'split-up'}>{reactHtmlParser(data?.posts?.list?.[1]?.data?.title)}</h3>
                                <p className={'split-up'} >{reactHtmlParser(data?.posts?.list?.[1]?.data?.description)}</p>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mission-vision__image reveal">
                            <Img  src={data?.images?.list?.[0]?.full_path}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </StyledDetail>

    );
};

const StyledDetail = styled.section`
  .mission-vision {
    &__content {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-around;
      background: #2D2D2D;
      align-items: center;
      h3 {
        font-size: 24px;
        line-height: 32px;
        font-family: Kudryashev Display;
        color: #FFFEFB;
        margin-bottom: 15px;
      }

      p {
        font-size: 16px;
        line-height: 24px;
        font-family: Suisse Int;
        font-weight: 400;
        color: #F9F8F5;
      }

      &__upper {
        padding: 60px 70px;

      }

      &__lower {
        padding: 60px 70px;
      }
      &:before{
        position: absolute;
        content: '';
        width: 100%;
        top: 50%;
        bottom: 50%;
        background-color: #FFFFFF;
        height: 1px;
      }
    }

    &__image {
      position: relative;
      padding-top: calc(570 / 570 * 100%);
      height: 100%;
    }
  }

  @media(max-width: 991px){
    .row{
      flex-direction: column-reverse;
    }
    .col-md-6{
      flex: 0 0 100%;
      width: 100%;
      min-width: 100%;
    }
    .mission-vision__image{
      margin-bottom: 20px;
    }
  }

  @media(max-width: 767px){
    .mission-vision__content__upper{
      padding: 25px 20px;
    }
    .mission-vision__content__lower{
      padding: 25px 20px;
    }
  }

`;

export default Mission;
