'use client';
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import Title from "./Title";
import Button from "./Button";
import ReactHtmlParser from "react-html-parser";
import {primary, secondary} from "@/styles/globalStyleVars";
import reactHtmlParser from "react-html-parser";
import {getFooterApi} from "@/api/api";

const Footer = ({img, text, title}) => {

    const year = new Date().getFullYear();
    const [getSettings, setSettings] = useState(null);
    useEffect(() => {
        const fetchSetting = async () => {
            const data = await getFooterApi();
            setSettings(data);
        };

        fetchSetting();
    }, []);



    return (
        <StyledFooter className='footer'>
            <Container>
                <Row>
                    <Col lg={3}>
                        <div className="footer__left">
                            {/*<img src="/images/static/logo-white.svg" alt=""/>*/}
                            {
                                getSettings?.data?.office_location &&
                                <a className={'address-hover'} href={`https://www.google.com/maps?q=${getSettings?.data?.office_location}`} target={'_blank'}>
                                    <p className={'address split-up'}>
                                        {reactHtmlParser(getSettings?.data?.office_location)}
                                    </p>
                                </a>
                            }

                            <a href={`mailto:${getSettings?.data?.info_email}`}><p className={'email split-up'}> Email: <span>{getSettings?.data?.info_email}</span> </p></a>
                        </div>

                    </Col>
                    <Col lg={{span: 4, offset: 1}} className={'d-flex align-items-center'}>
                        <div className="footer__middle">
                            {/*<Title text={'Symple Symmetric'}*/}
                            {/*       color={'#FFFEFB'}*/}
                            {/*       fontSize={'40'} lineHeight={'48'}*/}
                            {/*       spanMargin={'70px'}*/}
                            {/*/>*/}
                            <img src="/images/static/logo-white.svg" alt=""/>
                        </div>
                    </Col>
                    <Col lg={{span: 3, offset: 1}}>
                        <div className="footer__bottom">
                            <div className="footer__bottom__upper">
                                <a href={`tel:${getSettings?.data?.office_phone}`}><h2>{getSettings?.data?.office_phone}</h2></a>


                                <Button text={'Download Profile'} color={'#FFFFFF'} background={primary} hoverColor={'#56575A'} hoverBackground={'#FFFFFF'} hoverBorder={'#FFFFFF'} borderColor={primary} href={'tel:16677'}/>
                            </div>

                            <div className="footer__bottom__social">
                                <ul className="social">
                                    {
                                        getSettings?.data?.facebook &&
                                        <li>
                                            <a target="_blank" href={getSettings?.data?.facebook}>

                                                <svg id="Group_19824" data-name="Group 19824" xmlns="http://www.w3.org/2000/svg" width="9.672" height="18.059" viewBox="0 0 9.672 18.059">
                                                    <circle id="Ellipse_156" data-name="Ellipse 156" cx="1.233" cy="1.233" r="1.233" transform="translate(3.698 7.396)" fill="#fffefb"/>
                                                    <path id="Path_2112" data-name="Path 2112" d="M1207.826,106.257l.5-3.269h-3.136v-2.121a1.634,1.634,0,0,1,1.842-1.765h1.426V96.32a17.383,17.383,0,0,0-2.531-.221c-2.583,0-4.271,1.565-4.271,4.4v2.491h-2.871v3.269h2.871v7.9h3.533v-7.9Z" transform="translate(-1198.787 -96.099)" fill="#fffefb"/>
                                                </svg>
                                            </a>
                                        </li>
                                    }


                                    {
                                        getSettings?.data?.linkedin &&
                                        <li>
                                            <a target="_blank" href={getSettings?.data?.linkedinP}>
                                                <svg id="Group_28" data-name="Group 28" xmlns="http://www.w3.org/2000/svg" width="16.005" height="15.119" viewBox="0 0 16.005 15.119">
                                                    <path id="LinkedIn" d="M1103.44,3925.575v5.849h-3.43v-5.457c0-1.372-.5-2.307-1.739-2.307a1.874,1.874,0,0,0-1.759,1.24,2.291,2.291,0,0,0-.114.827v5.7h-3.432s.046-9.244,0-10.2h3.431v1.447c-.007.01-.016.022-.022.032h.022v-.032a3.413,3.413,0,0,1,3.093-1.686C1101.746,3920.984,1103.44,3922.442,1103.44,3925.575Zm-14.064-9.269a1.769,1.769,0,1,0-.046,3.525h.023a1.77,1.77,0,1,0,.022-3.525Zm-1.738,15.119h3.43v-10.2h-3.43Z" transform="translate(-1087.435 -3916.306)" fill="#fffefb"/>
                                                </svg>
                                            </a>
                                        </li>
                                    }


                                    {
                                        getSettings?.data?.instagram &&
                                        <li>
                                            <a target="_blank" href={getSettings?.data?.instagram}>
                                                <svg id="Group_1422" data-name="Group 1422" xmlns="http://www.w3.org/2000/svg" width="17.947" height="17.947" viewBox="0 0 17.947 17.947">
                                                    <g id="Group_1420" data-name="Group 1420" transform="translate(0)">
                                                        <g id="Group_1419" data-name="Group 1419" transform="translate(0 0)">
                                                            <path id="Path_2109" data-name="Path 2109" d="M1095.968,105.945A1.052,1.052,0,1,0,1097.02,107,1.052,1.052,0,0,0,1095.968,105.945Z" transform="translate(-1082.243 -102.741)" fill="#fffefb"/>
                                                            <path id="Path_2110" data-name="Path 2110" d="M1083.474,108.605a4.42,4.42,0,1,0,4.42,4.42A4.425,4.425,0,0,0,1083.474,108.605Zm0,7.251a2.831,2.831,0,1,1,2.831-2.831A2.834,2.834,0,0,1,1083.474,115.856Z" transform="translate(-1074.427 -104.052)" fill="#fffefb"/>
                                                            <path id="Path_2111" data-name="Path 2111" d="M1082.488,117.575h-7.165a5.4,5.4,0,0,1-5.391-5.391v-7.166a5.4,5.4,0,0,1,5.391-5.39h7.165a5.4,5.4,0,0,1,5.391,5.39v7.166A5.4,5.4,0,0,1,1082.488,117.575Zm-7.165-16.258a3.706,3.706,0,0,0-3.7,3.7v7.166a3.706,3.706,0,0,0,3.7,3.7h7.165a3.707,3.707,0,0,0,3.7-3.7v-7.166a3.707,3.707,0,0,0-3.7-3.7Z" transform="translate(-1069.932 -99.628)" fill="#fffefb"/>
                                                        </g>
                                                    </g>
                                                </svg>


                                            </a>
                                        </li>
                                    }

                                    {
                                        getSettings?.data?.youtube &&
                                        <li>
                                            <a target="_blank" href={getSettings?.data?.youtube}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15.804" height="11.063" viewBox="0 0 15.804 11.063">
                                                    <g id="Group_1424" data-name="Group 1424" transform="translate(0 -0.001)">
                                                        <path id="Path_2114" data-name="Path 2114" d="M1149.879,113.785a3.468,3.468,0,0,0-3.468-3.468h-8.868a3.468,3.468,0,0,0-3.468,3.468v4.127a3.468,3.468,0,0,0,3.468,3.468h8.868a3.468,3.468,0,0,0,3.468-3.468Zm-5.215,2.373-3.977,1.967c-.156.084-.685-.029-.685-.206v-4.039c0-.179.534-.292.69-.2l3.807,2.071C1144.658,115.84,1144.825,116.07,1144.664,116.158Z" transform="translate(-1134.075 -110.317)" fill="#fffefb"/>
                                                    </g>
                                                </svg>
                                            </a>
                                        </li>
                                    }


                                </ul>
                            </div>


                        </div>
                    </Col>
                </Row>

                <Row className="copyright">
                    <Col >
                        <div className={'bottom_line'}>
                            <p>© {year} Symple Symmetric. All Rights Reserved.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </StyledFooter>
    );
};

const StyledFooter = styled.section`
  padding: 60px 0 20px 0;
  background: ${secondary};

  .footer__left {

    a {
      &:hover {
        p {
          span { {
            color: #AC8B7C;
            transition: .2s ease-in-out;
          }

          }
        }

      }
    }

    .address {
      margin: 25px 0 10px 0;
    }


    p {
      font-size: 14px;
      line-height: 18px;
      font-weight: 300;
      color: #FFFEFB;
      transition: .2s ease-in-out;
    }
  }

  .footer__middle {
    position: relative;

    .icon {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(75%, -20%);

      img {
        height: 150px;
        width: 195px;
      }
    }
  }

  .footer__bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    height: 100%;
    width: 100%;

    &__upper {
      h2 {
        font-size: 28px;
        line-height: 36px;
        color: #FFFEFB;
        margin-bottom: 15px;

      }

      .dc-btn {
        a {
          transform: translateX(15px);
        }
      }

    }

    &__social {
      margin-top: 30px;
      ul {
        display: flex;
        justify-content: flex-end;


        li {
          margin-right: 37px;

          &:last-child {
            margin-right: 0px;
          }

          a {
            svg {
              path {
                transition: all 0.7s cubic-bezier(0.4, 0, 0, 1);
              }
            }
          }

          &:hover {
            a {
              svg {
                path {
                  fill: #AC8B7C;
                  transition: all 0.7s cubic-bezier(0.4, 0, 0, 1);
                }
              }
            }
          }

        }

      }
    }

  }

  .copyright {
    margin-top: 40px;
    .bottom_line{
      display: flex;
      justify-content: space-between;

      @media(max-width: 767px){
        display: block;
      }
    }



    p {
      font-size: 12px;
      line-height: 30px;
      font-weight: 300;
      color: #AC8B7C;
    }

    .link {
      font-size: 12px;
      line-height: 30px;
      font-weight: 300;
      color: #AC8B7C;
      cursor: pointer;
    }

  }

  @media (max-width: 991px) {

    .footer__bottom__social {
      margin-top: 40px;

      ul {
        justify-content: unset;

        li {
          margin-right: 30px;
        }
      }


    }

    .footer__middle {
      margin: 60px 0;
    }

    .footer__middle {
      h2 {
        span {
          margin-left: 70px;
        }
      }
    }

    .footer__bottom {
      display: block;
      margin-top: 20px;
    }

    .footer__left {
      margin-bottom: 20px;
    }

    .dc-btn {
      margin-left: -9px;
    }

  }

  @media (max-width: 767px) {
    .dc-btn{
      margin-left: -14px;
    }

    .col-lg-3{
      &:first-child{
        order: 2;
      }
    }
  }


`;

export default Footer;
