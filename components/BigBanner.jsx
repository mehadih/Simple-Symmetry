'use client'
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import BigImg from '@/public/images/dynamic/home_banner_02.jpg';
import {primary, title, white} from "@/styles/globalStyleVars";
import {Img} from "@/components/Img";
import Button from "@/components/Button";
import reactHtmlParser from "react-html-parser";
import ImageParallax from "@/components/ImageParallax";

const MyComponent = ({data}) => {
    return (
        <StyledComponent className={"big-banner"}>
            <div className="big-banner__inner">
                <ImageParallax src={data?.images?.list?.[0]?.full_path}/>
                <Container className={'big-banner__inner__title'}>
                    <h2>{reactHtmlParser(data?.section_data?.subtitle)}</h2>
                </Container>
                <Container>
                    <Row>
                        <Col sm={{span: 4, offset: 8}} className="big-banner__inner__desc">

                            <p>{reactHtmlParser(data?.section_data?.description)}</p>
                            <Button src={'/career'} text={'LEARN MORE'}color={'#FFFFFF'} background={primary} hoverColor={'#56575A'} hoverBackground={'#FFFFFF'} hoverBorder={'#FFFFFF'} borderColor={primary}/>

                        </Col>

                    </Row>
                </Container>
            </div>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  position: relative;
  overflow: hidden;

  &:after {
    position: absolute;
    height: 100%;
    width: 100%;
    inset: 0;
    content: '';
    background-color: rgba(38, 32, 30, 0.4);
  }

  h2 {
    font-size: 100px;
    line-height: 100px;
    color: ${white};
    position: absolute;
    top: 120px;
    font-weight: 300;
    letter-spacing: -8px;
    z-index: 2;

    span {
      font-style: italic;
    }
  }

  .big-banner__inner {
    position: relative;
    padding-top: calc(580 / 1366 * 100%);
    overflow: hidden;

    .container {
      position: absolute;
      bottom: 120px;
      left: 0;
      right: 0px;
      margin: auto;

    }

    &__title {
      top: 0;
      bottom: 0;
    }


    p {
      color: ${white};
    }

    &__desc {
      position: relative;

      img:not(.dc-btn img) {
        position: absolute;
        left: -50%;
        top: -90%;
      }

      p, h2 {
        position: relative;
        z-index: 2;
      }

      .dc-btn {
        margin-top: 40px;
        z-index: 2;
        position: relative;
      }
    }
  }

  @media (max-width: 1200px) {
    .big-banner__inner {
      h2 {
        font-size: 120px;
        line-height: 110px;
      }
    }
  }

  @media (max-width: 1024px) {
    .big-banner__inner .container {
      position: static;
      height: auto;
    }

    .big-banner__inner__desc {
      min-width: 100%;
      margin: 0;
      margin-bottom: 100px;

      img:not(.dc-btn img) {
        position: absolute;
        left: 0;
        top: -150%;
      }
    }
  }

  @media (max-width: 991px) {
    .big-banner__inner {
      padding-top: 120px;

      h2 {
        position: relative;
        top: 0;
        margin-bottom: 300px;
        font-size: 70px;
        line-height: 70px;
        letter-spacing: -2px;
      }

      &__desc img:not(.dc-btn img) {
        top: -100%;
      }
    }
  }

`;

export default MyComponent;
