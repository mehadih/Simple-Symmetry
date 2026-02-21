"use client";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import reactHtmlParser from "react-html-parser";

const MyComponent = ({ data }) => {
    return (
        <StyledComponent className="pt-160 pb-160">
            <Container className={"info"}>
                <Row>
                    <Col md={{ span: 10 }} className={"info__top"}>
                        <h2 className="fade-up">
                            {reactHtmlParser(data?.section_data?.short_desc)}
                        </h2>
                    </Col>
                    {data?.posts &&
                        data?.posts?.list?.length > 0 &&
                        data?.posts?.list?.map((e, i) => {
                            return (
                                <Col md={4} className={"info__single fade-up"} key={i}>
                                    <div className="info__single__wrapper">
                                        <h4>{reactHtmlParser(e?.data?.title)}</h4>
                                        <p>{reactHtmlParser(e?.data?.description)}</p>
                                    </div>
                                </Col>
                            );
                        })}
                </Row>
            </Container>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  background-color: #f1eee9;

  .info {
    &__top {
      margin-bottom: 80px;

      h2 {
        font-size: 48px;
        line-height: 56px;
        color: #3d3229;

        span {
          font-style: italic !important;
        }

        @media (max-width: 767px) {
          font-size: 70px;
          line-height: 70px;
          letter-spacing: -4.9px;
        }
      }
    }

    &__single {
      &__wrapper {
        h4 {
          color: #3d3229;
          margin-bottom: 20px;
          font-size: 32px;
          line-height: 40px;
        }
        p {
          font-size: 16px;
          line-height: 24px;
          color: #26201e;
          margin-bottom: 0;
        }
      }

      @media (max-width: 767px) {
        margin-bottom: 30px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;

export default MyComponent;
