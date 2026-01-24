'use client';
import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Container} from "react-bootstrap";
import Link from 'next/link'
import {Img} from "../Img";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slick from "react-slick";
import reactHtmlParser from "react-html-parser";
import {primary} from "@/styles/globalStyleVars";

const BannerSlider = ({data}) => {

    const [offset, setOffset] = useState()
    useEffect(() => {
        setOffset(document.querySelector('.container').offsetLeft)
    }, [])


    console.log('slider', data)


    const slickRef = useRef()


    function RightArrow(props) {
        const {className, style, onClick, currentSlide, slideCount} = props;
        return (
            //className={`arrow-container ${currentSlide === slideCount - 1 ? " slick-disabled" : ""}`}
            <Container className={`arrow-container`}>
                <li className="go-right" onClick={onClick}>
                    <svg width="41.207" height="21.414" viewBox="0 0 41.207 21.414">
                        <g id="Group_15840" data-name="Group 15840" transform="translate(-1227.5 -1841.293)">
                            <g id="Group_5742" data-name="Group 5742" transform="translate(-610.5 2529.5)"
                               opacity="0.5">
                                <line id="Line_59" data-name="Line 59" x2="10" y2="10"
                                      transform="translate(1868.5 -687.5)" fill="none" stroke="#f2f0f0"
                                      stroke-linecap="round" stroke-width="1.2"/>
                                <line id="Line_60" data-name="Line 60" y1="10" x2="10"
                                      transform="translate(1868.5 -677.5)" fill="none" stroke="#f2f0f0"
                                      stroke-linecap="round" stroke-width="1.2"/>
                                <line id="Line_61" data-name="Line 61" x1="40" transform="translate(1838.5 -677.5)"
                                      fill="none" stroke="#f2f0f0" stroke-linecap="round" stroke-width="1.2"/>
                            </g>
                        </g>
                    </svg>

                </li>
            </Container>

        );
    }

    function LeftArrow(props) {
        const {className, style, onClick, currentSlide, slideCount} = props;
        return (
            // className={`arrow-container ${currentSlide === 0 ? " slick-disabled" : ""}`}>
            <Container className={`arrow-container`}>
                <li className="go-left" onClick={onClick}>
                    <svg width="41.207" height="21.414" viewBox="0 0 41.207 21.414">
                        <g id="Group_15839" data-name="Group 15839" transform="translate(-1167.293 -1841.293)">
                            <g id="Group_5743" data-name="Group 5743" transform="translate(1168 1842)" opacity="0.5">
                                <line id="Line_59" data-name="Line 59" x1="10" y2="10" fill="none" stroke="#f2f0f0"
                                      stroke-linecap="round" stroke-width="1.2"/>
                                <line id="Line_60" data-name="Line 60" x1="10" y1="10" transform="translate(0 10)"
                                      fill="none" stroke="#f2f0f0" stroke-linecap="round" stroke-width="1.2"/>
                                <line id="Line_61" data-name="Line 61" x2="40" transform="translate(0 10)" fill="none"
                                      stroke="#f2f0f0" stroke-linecap="round" stroke-width="1.2"/>
                            </g>
                        </g>
                    </svg>

                </li>
            </Container>
        );
    }

    const sliderChangeSpeed = 5000;
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        speed: 1400,
        autoplaySpeed: sliderChangeSpeed,
        pauseOnHover: false,
        // focusOnSelect: false,
        // simulateTouch: false,
        nextArrow: <RightArrow/>,
        prevArrow: <LeftArrow/>,
        draggable: false,
        // responsive: [
        //     {
        //         breakpoint: 991,
        //         settings: {
        //
        //             speed: 400,
        //             // autoplay: false
        //         }
        //
        //     }
        // ],
        onInit: function () {
            let getTheLists = document.querySelectorAll('.slick-list .slick-slide:not(.slick-active)');
            setLists(getTheLists)
        },
        beforeChange: function () {
            let getTheLists = document.querySelectorAll('.slick-list .slick-slide:not(.slick-active)');
            setLists(getTheLists)
        },
        afterChange: function (e) {
            if ((1) === e && window.scrollY <= window.innerHeight) {
                setTimeout(() => {
                    slickRef.current.slickGoTo(0);
                }, sliderChangeSpeed)
            }
        }
    };
    // on scroll slider off and on


    const [lists, setLists] = useState([])
    useEffect(() => {
        lists.forEach(e => {
            e.addEventListener('mouseover', () => {
                document.querySelector('.slick-active').classList.add('transform')
            })
            e.addEventListener('mouseout', () => {
                document.querySelector('.slick-active').classList.remove('transform')
            })
        })
    }, [lists])

    useEffect(() => {

        setTimeout(() => {
            if (document.querySelector('.banner-slider')) {
                console.log('is class', document.querySelector('.banner-slider'))
                document.querySelector('.banner-slider').classList.add('active-slide')
            }

        }, 400)
    }, [])


    // slider click handler
    const handleSliderClick = (e) => {
        slickRef.current.slickGoTo(e);
    }

    return (
        <StyledBanner offset={offset} sliderChangeSpeed={sliderChangeSpeed} className='banner-slider'>

            {
                data?.posts?.list &&
                <Slick {...settings} ref={slickRef}>
                    {
                        data?.posts?.list?.length > 0 &&
                        data?.posts?.list?.map((e,i)=>{
                            return(
                                <div onClick={() => handleSliderClick(i)}
                                     className="banner-slider__single" key={i}>
                                    <Img src={e?.images?.[0]?.full_path} alt={e?.data?.title}/>
                                    <div className="banner-slider__single__content">
                                        <p>{reactHtmlParser(e?.data?.subtitle)}</p>
                                        <Link href=''>{reactHtmlParser(e?.data?.title)}</Link>
                                        <p>{reactHtmlParser(e?.data?.description)}</p>
                                        <div className="line"/>
                                    </div>
                                </div>
                            );
                        })
                    }
                </Slick>
            }
        </StyledBanner>
    );
};

const StyledBanner = styled.section`
  height: calc(100vh);
  position: relative;
  background-color: #000;


  .banner-slider__single {
    position: relative !important;
    height: calc(100vh);
    padding: 0 15px;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.35);
      height: 100vh;
      z-index: 2;
      width: 100%;
      //display: none;
      @media (max-width: 768px) {
        opacity: 0;
        transition: opacity .3s ease;
      }
    }

    @media (max-width: 768px) {
      &__content {
        opacity: 0;
        transition: opacity .3s ease;
      }
    }


    .line {
      top: 0;
      bottom: -300px;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 2;
      position: absolute;
      width: 55%;
      height: 1px;

      &:before {
        content: '';
        top: 0;
        bottom: 0px;
        left: 0;
        z-index: 2;
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.30);
      }

      &:after {
        content: '';
        width: 0;
        height: 1px;
        background-color: #ff0000;
        position: absolute;
        top: 0;
        bottom: 0px;
        left: 0;
        z-index: 3;
        transition: width ${props => props.sliderChangeSpeed}ms cubic-bezier(0.4, 0, 0, 1);
      }
    }

    img {
      transition: all .6s ease !important;
      display: block !important;
      opacity: 1 !important;
      filter: brightness(0.4);
    }

    a {
      position: absolute;
      left: -60px;
      top: 0px;
      right: 100%;
      bottom: 0;
      margin: auto;
      height: fit-content;
      width: fit-content;
      color: rgba(255, 255, 255, 0.29) !important;
      font-size: 68px;
      line-height: 68px;
      font-weight: 600;
      text-transform: uppercase;
      transition: all 1.5s ease;
      transition-delay: .6s;
      z-index: 4;
      white-space: nowrap;
      overflow: visible;
    }

    p {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 5;
      color: rgba(255, 255, 255, 0.85);
      top: 0;
      bottom: 0px;
      width: fit-content;
      height: fit-content;
      text-transform: uppercase;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: 2px;
      text-align: center;


      &:nth-last-of-type(1) {
        bottom: -200px;
      }

      &:nth-of-type(1) {
        bottom: 200px;
      }
    }

  }


  .slick-dots {
    bottom: 20px;

    li {
      height: 5px;

      button {
        width: 20px;
        height: 5px;
        background-color: #fff;
        opacity: 1;
        border-radius: 5px;
        position: relative;
        padding: 0;

        &:before {
          width: 0px;
          height: 100%;
          left: 0;
          font-size: 0;
          background-color: ${primary};
          opacity: 1;
          border-radius: 5px;

        }
      }

      &.slick-active {
        button:before {
          width: 100%;
          transition: width 4.3s ease;
        }
      }
    }

  }

  .slick-list {
    .slick-slide {
      z-index: 9;
      transition: transform .5s ease !important;
    }

    .slick-slide:not(.slick-active) {
      transform: translateX(-100px) !important;

      img {
        transform: translateX(100px);

      }
    }

    .slick-active {

      @media (max-width: 768px) {
        .banner-slider__single:before {
          opacity: 1;
          transition-delay: .4s;
        }

        .banner-slider__single__content {
          opacity: 1;
          transition-delay: .4s;
        }
      }

      a {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        transition-delay: .0s;
        color: rgba(255, 255, 255, 0.85) !important;
      }

      img {
        filter: none;
      }

      &:hover {
        transform: none !important;
      }
    }
  }

  .slick-slide:not(.slick-active) {
    &:hover {
      transform: translateX(-150px) !important;
    }
  }

  .slick-active.transform {
    transform: translateX(-50px) !important;
  }

  //&.active-slide .slick-active {
  //  .banner-slider__single .line:after {
  //    width: 100%;
  //  }
  //}

  .slick-active {
    .banner-slider__single .line:after {
      width: 100%;
    }
  }

  .go-left, .go-right {
    position: absolute;
    bottom: 60px;
    z-index: 99;
    cursor: pointer;
    width: 50px;
    transition: all .5s ease;

  }

  .go-right {
    right: ${props => props.offset + 15}px;

    svg {
      g {
        transition: all .3s ease;
      }

      transition: 0.7s all ease;

      #Line_61 {
        transition: 0.7s stroke-dasharray ease;
        stroke-dasharray: 40;

      }

    }

    &:hover {
      svg {
        g {
          opacity: 1;
        }

        #Line_61 {
          transition: 0.7s stroke-dasharray ease;
          stroke-dasharray: 30;
          stroke: #FFF;
        }

        line {
          stroke: #FFF;
        }
      }
    }

    @media (max-width: 767px) {
      right: unset !important;
      left: 80px !important;
    }
  }


  .go-left {
    right: ${props => props.offset + 80}px;

    g {
      transition: all .3s ease;
    }

    svg {


      transition: 0.7s all ease;

      #Line_61 {
        transition: 0.7s stroke-dasharray ease;
        stroke-dasharray: 40;

      }

    }

    &:hover {
      g {
        opacity: 1;
      }

      svg {
        #Line_61 {
          transition: 0.7s stroke-dasharray ease;
          stroke-dasharray: 30;

        }
      }
    }

    @media (max-width: 767px) {
      right: unset !important;
      left: 15px !important;
    }
  }

  @media (max-width: 991px) {
    .slick-list {
      .slick-slide:not(.slick-active) {
        transform: none !important;
      }

      .slick-slide {

        img {
          transform: none !important;
        }

        .banner-slider__single a {
          left: 0 !important;
        }
      }
    }

  }


  @media (max-width: 768px) {
    .banner-slider__single {
      padding: 0 15px;
      align-items: center;
      //justify-content: center;
      display: flex !important;

      &__content {
        width: 100%;

        p, a {
          position: relative;
          left: 0;
          right: auto;
          text-align: left;
          margin-left: initial;
        }

        a {
          font-size: 28px;
          line-height: 36px;
          margin-top: 20px !important;
          padding-bottom: 20px;
          display: block;
          margin-left: initial !important;
          text-align: left;
        }

        .line {
          position: relative;
          bottom: auto;
          left: 0;
          right: auto;
          margin-left: initial;
          width: 100%;
          margin-top: 30px;
        }
      }

    }
  }

  //.slick-current {
  //  pointer-events: none;
  //}


`;


export default BannerSlider;
