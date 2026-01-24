"use client";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

import reactHtmlParser from "react-html-parser";

const MyComponent = ({ data }) => {

    return (
        <StyledComponent className={"pt-160 pb-160"}>
            <Container className={"info"}>
                <Row>
                    <Col md={4} className={"info__left"}>
                        <h2>{reactHtmlParser(data?.section_data?.subtitle)}</h2>
                    </Col>
                    <Col md={{ offset: 2, span: 6 }} className={"info__right"}>
                        <div className="info__right__address">
                            <div className="info__right__address__single">
                                <p>{reactHtmlParser(data?.posts?.list?.[0]?.data?.title)}</p>
                                <a
                                    href={`https://www.google.com/maps?q=${reactHtmlParser(data?.posts?.list?.[0]?.data?.subtitle)}`}
                                    target={"_blank"}
                                >
                                    {reactHtmlParser(data?.posts?.list?.[0]?.data?.subtitle)}
                                </a>
                            </div>
                        </div>

                        <div className="info__right__contact">
                            <div className="info__right__contact__single">
                                <p>{reactHtmlParser(data?.posts?.list?.[1]?.data?.title)}</p>
                                <ul>
                                    <li>
                                        <a
                                            href={`tel:${data?.posts?.list?.[1]?.data?.subtitle}`}
                                            target={"_blank"}
                                            rel={"nofollow"}
                                        >
                                            {data?.posts?.list?.[1]?.data?.subtitle}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="info__right__contact__single">
                                <p>Email Us</p>
                                <ul>
                                    <li>
                                        <a
                                            href={`mailto:${data?.posts?.list?.[2]?.data?.subtitle}`}
                                            target={"_blank"}
                                            rel={"nofollow"}
                                        >
                                            {data?.posts?.list?.[2]?.data?.subtitle}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  background-color: #f1eee9;

  .info {
    &__left {
      h2 {
        color: #3d3229;
        font-size: 70px;
        line-height: 84px;
        letter-spacing: -4.9px;

        span {
          font-style: italic !important;
        }

        @media (max-width: 767px) {
          font-size: 70px;
          line-height: 70px;
          letter-spacing: -4.9px;
        }

        span {
          font-style: italic !important;
        }
      }
    }

    &__right {
      &__address {
        display: flex !important;
        flex-wrap: wrap;
        padding-bottom: 60px;
        border-bottom: 1px solid rgba(38 32 30 / 0.2);

        &__single {
          min-width: 50%;
          padding-right: 10px;
          margin-bottom: 20px;
          p {
            font-size: 12px;
            line-height: 16px;
            color: rgba(61 50 41 / 0.5);
            padding-bottom: 10px !important;
            margin-bottom: 0;
          }

          a {
            font-size: 16px;
            line-height: 24px;
            letter-spacing: -0.48px;
            color: #3d3229;
          }
        }
      }
      &__contact {
        padding-top: 60px;
        display: flex !important;
        flex-wrap: wrap;
        &__single {
          min-width: 50%;
          p {
            font-size: 12px;
            line-height: 16px;
            color: rgba(61 50 41 / 0.5);
            padding-bottom: 10px !important;
            margin-bottom: 0;
          }

          ul {
            li {
              padding-bottom: 10px;
              &:last-child {
                padding-bottom: 0;
              }
              a {
                font-size: 16px;
                line-height: 24px;
                letter-spacing: -0.48px;
                color: #3d3229;
              }
            }
          }
        }
      }
    }

    @media (max-width: 767px) {
      &__left {
        margin-bottom: 40px;
        h2 {
          font-size: 45px;
          line-height: 45px;
        }
      }

      &__right {
        &__address {
          padding-bottom: 30px;
          flex-direction: column;
          gap: 30px;
        }
        &__contact {
          padding-top: 30px;
          flex-direction: column;
          gap: 30px;
        }
      }
    }
  }
`;

export default MyComponent;
