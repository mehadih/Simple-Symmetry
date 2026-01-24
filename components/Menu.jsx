'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Container, Row, Col, Accordion} from "react-bootstrap";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import Button from "@/components/Button";
import {primary, secondary, offWhite} from "@/styles/globalStyleVars"
import CloseButton from "@/components/CloseButton";
import {getFooterApi} from "@/api/api";

// Register GSAP plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(CSSPlugin);
}

const MyComponent = () => {
    const pathname = usePathname();
    const [offset, setOffset] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [isScrolledUp, setIsScrolledUp] = useState(pathname.startsWith('/project'));

// Add this useEffect
    useEffect(() => {
        if (pathname.startsWith('/project/')) {
            setIsScrolledUp(true);
        }
    }, [pathname]);


    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        setOffset(document.querySelector('.container').offsetLeft + 16)
        window.addEventListener('resize', () => {
            setOffset(document.querySelector('.container').offsetLeft + 16)
        })
    }, [])

    // menu action
    useEffect(() => {
        // menu open
        let getMenu = document.querySelector('.slide-menu');
        let getClick = document.querySelector('.hamburger');
        let getCloseClick = document.querySelector('.slide-menu__close');
        let tl = gsap.timeline()
        getClick.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent the event from propagating

            document.body.classList.add('menu-open')
            if (typeof window !== 'undefined' && window.innerWidth > 600) {
                setTimeout(() => {
                    disableBodyScroll(e)
                }, 300)
            }


            tl.to(getMenu, {
                display: 'flex',
                duration: 0
            }).to('.menu-overlay', {
                display: 'block',
                duration: 0,
            }, '-=.3').to('.menu-overlay', {
                opacity: 1
            }).to(getMenu, {
                x: 0,
                // duration: 1,
                ease: 'Power4.easeInOut'
            }, '-=.5').to('.slide-menu li,.accordion-item ', {
                y: 0,
                opacity: 1,
                ease: 'Power4.easeInOut',
                stagger: .02
            }, '-=.3')
        });




        // menu close
        window.addEventListener('click', (e) => {
            if (document.body.classList.contains('menu-open')) {
                // e.stopPropagation(); // Prevent the event from propagating

                if (!e.target.matches('.search-action,.search-action img, .hamburger,.hamburger span, .accordion-header, .accordion-header button,.accordion-header span, .accordion-header img, .accordion-collapse , .accordion-collapse div, .accordion-collapse ul, .accordion-collapse li,.slide-menu .bg-noise,.slide-menu ul .accordion li') ) {

                    if (typeof window !== 'undefined' && window.innerWidth > 600) {
                        setTimeout(() => {
                            enableBodyScroll(e)
                        }, 300)
                    }
                    tl.to('.slide-menu li,.accordion-item ', {
                        y: 20,
                        opacity: 0,
                        ease: 'Power4.easeInOut',
                        stagger: .01,
                        duration: .4
                    }).to(getMenu, {
                        x: '100%'
                    }, '-=.3').to(getMenu, {
                        display: 'node',
                        duration: 0
                    }).to('.menu-overlay', {
                        display: 'none',
                        opacity: 0
                    }, '-=.3')
                    document.body.classList.remove('menu-open')
                }
            }
        })


    }, [])


    // menu fixed on scroll
    useEffect(() => {
        if (document.body.classList.contains('scroll-down')) {
            document.body.classList.remove('scroll-down');
        }
    });

    useEffect(() => {
        const body = document.body;
        const scrollUp = 'scroll-up';
        const scrollDown = 'scroll-down';
        let lastScroll = 0;
        let howMuchScroll;

        if (typeof window !== 'undefined' && window.screen.width < 991) {
            howMuchScroll = 150;
        } else {
            howMuchScroll = 150;
        }

        window.addEventListener('scroll', () => {
            let currentScroll = window.pageYOffset;

            if (currentScroll <= howMuchScroll) {
                body.classList.remove(scrollUp);
                body.classList.remove(scrollDown);
                setIsScrolledUp(false);
                return;
            }

            if (currentScroll > lastScroll && currentScroll > howMuchScroll) {
                // down
                body.classList.remove(scrollUp);
                body.classList.add(scrollDown);
                setIsScrolledUp(false);
            } else if (currentScroll < lastScroll && currentScroll > howMuchScroll) {
                // up
                body.classList.remove(scrollDown);
                body.classList.add(scrollUp);
                setIsScrolledUp(true);
            }

            lastScroll = currentScroll;
        });
    }, []);



    const [getSettings, setSettings] = useState(null);
    useEffect(() => {
        const fetchSetting = async () => {
            const data = await getFooterApi();
            setSettings(data);
        };

        fetchSetting();
    }, []);

    return (
        <StyledComponent className={'main-menu'} >
            <div className="menu-overlay"/>

            {/*menu bar */}
            <Container>
                <div className="main-menu__bar">
                    <Row>
                        {
                            typeof window !== 'undefined' && window.innerWidth > 767 ?
                                <Col md={5}>
                                    <div className={'buttons'}>
                                        <Button src={'/projects'} text={'EXPLORE PROJECTS'} color={offWhite} background={primary} hoverColor={secondary} hoverBackground={offWhite} hoverBorder={offWhite} borderColor={primary} />
                                        <Button src={'/about'} text={'ABOUT US'} color={'#FFFFFF'} background={primary} hoverColor={'#56575A'} hoverBackground={'#FFFFFF'} hoverBorder={'#FFFFFF'} borderColor={primary}/>
                                    </div>
                                </Col> : ''
                        }

                        <Col md={{span:2}}>
                            <div className="main-menu__logo">
                                <Link href={'/'}>
                                    <img
                                        src={
                                            pathname.startsWith('/project')
                                                ? "/images/static/logo.svg"
                                                : (isScrolledUp ? "/images/static/logo.svg" : "/images/static/logo-white.svg")
                                        }
                                        alt=""
                                    />
                                </Link>
                            </div>
                        </Col>
                        <Col md={{span:4,offset:1}} className={'d-flex justify-content-end'}>
                            <ul>
                                {
                                    typeof window !== 'undefined' && window?.innerWidth>767 ?
                                        <li>
                                            <Button text={getSettings?.data?.office_phone} color={'#FFFFFF'} background={primary} hoverColor={'#56575A'} hoverBackground={'#FFFFFF'} hoverBorder={'#FFFFFF'} borderColor={primary} href={`tel:${getSettings?.data?.office_phone}`}/>
                                        </li> :
                                        <li>
                                            <a href={`tel:${getSettings?.data?.office_phone}`}><img src="/images/static/phone.svg" alt=""/></a>
                                        </li>

                                }

                                <li className={'hamburger slide'}>
                                    <div className={'circle'}>
                                        <span/>
                                        <span/>
                                    </div>
                                    {
                                        typeof window !== 'undefined' && window.innerWidth > 767 ?
                                            <h6>MENU</h6> : ''
                                    }
                                </li>
                            </ul>
                        </Col>
                    </Row>

                </div>
            </Container>


            {/*menu item slide */}
            <div className="slide-menu">
                <div className={'bg-noise'}/>

                {
                    typeof window !== 'undefined' && window.innerWidth > 767 ?
                        <div className={'close-btn'}>
                            <div className={'d-flex'}>
                                <img src={'/images/static/close.svg'} alt={''}/>
                                <h6>CLOSE</h6>

                            </div>
                        </div> :
                        <div className={'mobile-top'}>
                            <Link href={'/'}><img src="/images/static/logo-white.svg" alt=""/></Link>
                            <CloseButton bg={'#151617'} border={'#151617'}/>
                        </div>

                }

                <ul>

                    <Accordion>
                        <li className={pathname === '/' ? 'active' : ''}><Link href={'/'}>Home</Link></li>
                        <li className={pathname === '/about' ? 'active' : ''}><Link href={'/about'}>About</Link></li>

                        <Accordion.Item
                            className={pathname.startsWith('/project') ? 'active' : ''}
                            eventKey="1">
                            <Accordion.Header><span>Projects</span> <img src="/images/static/caret-down.svg"
                                                                         alt=""/></Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    <li><Link href="/projects?status=ongoing"><h5>Ongoing Projects</h5></Link></li>
                                    <li><Link href="/projects?status=completed"><h5>Completed Projects</h5></Link></li>
                                    <li><Link href="/projects?status=planned"><h5>Planned Projects</h5></Link></li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <li className={pathname === '/career' ? 'active' : ''}><Link
                            href={'/career'}>Career</Link></li>
                        <li className={pathname === '/contact' ? 'active' : ''}><Link
                            href={'/contact-us'}>Contact Us</Link></li>
                    </Accordion>
                </ul>

            </div>


        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  height: 75px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.6s ease;

  .menu-overlay {
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    inset: 0;
    display: none;
    opacity: 0;
  }

  .main-menu__logo {
    a {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      &:nth-of-type(2) {
        display: none;
      }
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;

    .main-menu__bar {
      .row {
        display: flex;
        align-items: center;
      }

      @media (max-width: 767px) {
        ul {
          li {
            &:first-child {
              width: 45px;
              height: 45px;
            }
          }
        }
      }

      .buttons {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      ul {
        display: flex;
        height: 100%;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;

          a {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            height: 100%;
            width: 100%;
            text-decoration: none;
          }

          &:first-child {
            @media (max-width: 767px) {
              background-color: ${primary};
              padding: 15px;
              //border-radius: 50%;
            }
          }
        }

        .hamburger {
          padding-left: 30px;
          display: flex;
          cursor: pointer;

          h6 {
            color: #ffffff;
            margin-left: 10px;
            font-size: 14px;
            line-height: 16px;
          }

          span {
            height: 2px;
            width: 40px;
            background-color: ${primary};
            border-radius: 2px;
            display: block;
            position: relative;
            z-index: 2;
            transition: all 0.6s ease;
            margin-bottom: 7px;

            &:last-child {
              margin-bottom: 4px;
            }
          }

          @media (max-width: 767px) {
            padding-left: 30px;

            div {
              background-color: ${primary};
              padding: 15px;
              //border-radius: 50%;
            }

            span {
              width: 15px;
              background-color: white;

              &:last-child {
                margin: 4px 0;
                margin-left: 8px;
                width: 7px;
                display: flex;
                align-items: end;
              }
            }
          }
        }
      }
    }
  }

  .slide-menu {
    position: fixed;
    height: 100vh;
    width: 350px;
    right: 0;
    top: 0;
    z-index: 9999;
    padding: 140px 70px;
    align-items: center;
    display: none;
    transform: translateX(100%);
    flex-wrap: wrap;

    .bg-noise {
      position: absolute;
      inset: 0px;
      overflow: hidden;
      width: 100%;
      height: 100%;
      background: ${primary};
      opacity: 0.9;
      z-index: -2;
      
      //&::after{
      //  content: "";
      //  background-image: url(/images/static/outlines.svg);
      //  background-blend-mode: multiply;
      //  width: 100%;
      //  height: 100%;
      //  position: absolute;
      //  inset: 0px;
      //  opacity: 0.25;
      //}
    }

    .close-btn {
      position: absolute;
      right: 98px;
      top: 42px;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      h6 {
        color: #f5f5f5;
        margin-left: 10px;
      }
    }

    .mobile-top {
      //border-bottom: 2px solid #f5f5f5;
      //padding-bottom: 20px;
      //margin-bottom: 20px;
      //width: 100%;

      a {
        position: absolute;
        left: 15px;
        top: 30px;
        cursor: pointer;
        overflow: hidden;
        display: flex;
        align-items: center;
        
        img{
          height: 40px;
          width: 140px;
        }
      }

      .close-button {
        cursor: pointer;
        position: absolute;
        height: 40px;
        width: 40px;
        //border-radius: 50%;
        border: 1px solid ${primary};
        right: 30px;
        top: 30px;
        overflow: hidden;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        background-color: #ffffff;
      }
    }

    .active a,
    .active span {
      border-bottom: 2px solid #f5f5f5;
      color: #ffffff;
    }

    a {
      font-size: 20px;
      line-height: 28px;
      color: rgba(245, 245, 245, 0.5);
      text-decoration: none;

      &:hover {
        color: rgb(245, 245, 245) !important;
      }
    }

    ul {
      width: 100%;
      list-style: none;
      padding: 0;
      margin: 0;
      border: 0;

      li {
        margin-bottom: 20px;
        transform: translateY(20px);
        opacity: 0;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .accordion-item {
      transform: translateY(20px);
      opacity: 0;

      a {
        border: none;
      }
    }

    .accordion-header {
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;

      button {
        background-color: transparent;
        padding: 0;
        box-shadow: none;
        border: none;
        font-size: 20px;
        line-height: 28px;
        color: #f5f5f5;
        margin-bottom: 20px;
        transition: color 0.6s ease;
        width: 100%;
        text-align: left;
        position: relative;
        cursor: pointer;

        img {
          position: absolute;
          right: 0;
          top: 11px;
          transform: rotate(180deg);
          transition: transform 0.3s ease;
        }

        &:hover {
          color: rgb(245, 245, 245) !important;
        }

        &.collapsed {
          color: rgba(245, 245, 245, 0.5);

          img {
            transform: rotate(0deg);
          }
        }
      }
    }

    .accordion{
      margin-top: 60px;
    }
    .accordion-body {
      margin-bottom: 20px;

      ul {
        padding-left: 20px;
        padding-top: 20px;
      }

      h5 {
        color: #f5f5f5;
        font-size: 15px;
        margin: 0;
      }

      a {
        font-size: 15px;
        line-height: 20px;
        color: #f5f5f5;

        &:hover {
          color: rgba(245, 245, 245, 0.5) !important;
        }
      }
    }
  }

  @media (max-width: 767px) {
    .main-menu__logo {
      img {
        width: 158px;
        height: 45px;
      }
    }

    .main-menu__bar {
      .row {
        justify-content: space-between;
        align-items: center;

        .col-md-4,
        .col-md-2 {
          width: auto;
        }
      }

      ul li {
        width: 55px;

        &:nth-of-type(2),
        &:nth-of-type(3) {
          display: none;
        }

        &.hamburger {
          padding-left: 19px;
          padding-right: 15px !important;
          width: 60px !important;

          span {
            width: 15px;
          }
        }
      }
    }

    .slide-menu {
      padding: 80px 30px 30px;
      align-items: normal;
      overflow: auto;

      ul {
        border-top: 1px solid #f5f5f5;
      }
    }
  }

  @media (max-width: 500px) {
    .slide-menu {
      width: 100%;
      padding: 100px 15px 15px;
    }
  }
`;

export default MyComponent;