'use client';
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ProjectBox from "@/components/project/ProjectBox";
import NavigationIcon from "@/components/NavigationIcon";
import {offWhite, primary} from "@/styles/globalStyleVars";
import Title from "@/components/Title";

const FeatureSlider = ({ data }) => {
    let containerRef = useRef();
    let sliderRef = useRef();



    const [offset, setOffset] = useState(90)


    useEffect(() => {
        const updateOffset = () => setOffset(document.querySelector('.container')?.offsetLeft);

        window.addEventListener('load', updateOffset);
        window.addEventListener('resize', updateOffset);

        updateOffset(); // Initial calculation

        return () => {
            window.removeEventListener('load', updateOffset);
            window.removeEventListener('resize', updateOffset);
        }
    }, []);


    const title = "FEATURED PROJECTS";


    return (
        <StyledBlog offset={offset} className='blog-slider pt-160 pb-160'>
            <Container data-lag={'0.1'} ref={containerRef}>
                <Row>
                    <Col sm={6}>
                        <div className="blog-title">
                            {
                                title &&
                                <Title margin={'0 0 50px 0'} noanim text={title}/>

                            }
                        </div>

                    </Col>
                    {
                        window.innerWidth > 767 &&
                        <Col md={6}>
                            <NavigationIcon next_id={'act-next'} prev_id={'act-prev'}/>
                        </Col>
                    }

                </Row>
            </Container>

            <div data-lag={'0.2'} className={`blog-slider__slider-wrap`}>
                <div className="blog-slider__slider-wrap__inner">

                    {
                        data?.length > 0 &&
                        <Swiper
                            loop={true}
                            autoplay={false}
                            slidesPerView={2}
                            speed={1000}
                            initialSlide={1}
                            spaceBetween={30}
                            lazy={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            navigation={{
                                prevEl: '#act-prev',
                                nextEl: '#act-next',
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 30,

                                },
                                768: {
                                    slidesPerView: 1,
                                    spaceBetween: 30,

                                },
                                1024: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                            }}
                            ref={sliderRef}
                            className="mySwiper"
                        >

                            {
                                data?.map((e, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <ProjectBox
                                                link={`/project/${e.id}`}
                                                title={e.title}
                                                type={e.type}
                                                location={e.location}
                                                katha={e.katha}
                                                img={e.img}
                                            />
                                        </SwiperSlide>
                                    )
                                })
                            }


                        </Swiper>

                    }


                </div>


                {
                    window.innerWidth < 767 &&
                    <NavigationIcon next_id={'act-next'} prev_id={'act-prev'}/>

                }
            </div>
        </StyledBlog>
    );
};

const StyledBlog = styled.section`
  background-color: ${offWhite};
  .blog-title {
    position: relative;

    p {
      position: absolute;
      top: 0;
      right: 0;

    }

  }

  .blog-button {
    display: flex;
    justify-content: space-between;
    margin-bottom: 85px;
    align-items: center;

    .slider-nav {
      ul {
        display: flex;
      }

      li {
        height: 50px;
        width: 50px;
        background-color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;

        &:nth-of-type(1) {
          margin-right: 20px;
        }

        svg {
          color: #ffffff;
          z-index: 2;
        }
      }
    }
  }

  .navigation_button{
    ul{
      justify-content: flex-end;
    }
  }

  .swiper-button-next, .swiper-button-prev, .swiper-pagination {
    opacity: 0;
    visibility: hidden;
  }

  .swiper-initialized {
    padding-left: ${props => props.offset + 200}px;
    padding-right: ${props => props.offset + 200}px;
  }

  .slider-nav-mobile {
    display: none;
  }

  .global-image {
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #000;
      opacity: 0.3;
      height: 100%;
      width: 100%;
    }
  }

  .blog-slider {
    &__slider-wrap {
      &__inner {
        .blog-single {
          &__inner {
            padding-top: calc(520 / 370 * 100%);
          }
        }
      }
    }
  }

  .blog-single__inner {
    padding-top: calc(520 / 370 * 100%);
    position: relative;

    a {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 3;
    }

    &__content {
      &:after {
        opacity: 1;
        content: '';
        height: 0;
        bottom: 0;
        width: 100%;
        background-color: #26201E;
        left: 0;
        right: 0;
        position: absolute;
        transition: all .4s ease;
      }

      &__top {
        p {
          font-size: 16px;
          font-weight: 500;
          line-height: 22px;
          color: #ffffff;
          position: absolute;
          left: 40px;
          top: 40px;
          z-index: 2;
          right: 40px;
          margin: 0;
          transform: translateY(-30px);
          opacity: 0;
          transition: all .6s ease;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }

        h4 {
          font-size: 24px;
          font-weight: 500;
          position: absolute;
          top: 40px;
          left: 40px;
          right: 40px;
          z-index: 2;
          color: #F1EEE9;
          margin: 0;
          transition: all .3s ease;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
      }

      &__bottom {
        position: absolute;
        margin: 0;
        left: 40px;
        right: 40px;
        bottom: 24px;
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        z-index: 2;
        align-items: baseline;

        h4 {
          font-size: 80px;
          font-weight: 300;
          color: #F1EEE9;
          line-height: 65px;
          transition: color .3s ease;
        }

        p {
          color: #F1EEE9;
          text-align: right;
          transition: color .3s ease;

          span {
            display: block;
            color: ${primary};
          }
        }
      }
    }

    &:hover {
      .blog-single__inner__content:after {
        height: 100%;
      }

      .blog-single__inner__content__top {
        h4 {
          opacity: 0;
          transform: translateY(-20px);
        }

        p {
          transform: none;
          opacity: 1;
        }
      }

      .blog-single__inner__content__bottom {
        border-color: #FFF;

        h4 {
          color: #ffffff;
        }

        p {
          color: #ffffff;

          span {
            color: #ffffff;
          }
        }
      }
    }

  }


  @media (max-width: 767px) {

    .navigation_button {
      margin-top: 40px;
    }

    .blog-single__inner__content__top {
      p, h2 {
        left: 30px;
        right: 30px;
        top: 30px;
      }
    }

    .blog-single__inner__content__bottom h4, .blog-single__inner__content__bottom p {
      left: 30px;
      right: 30px;
      top: 30px;
    }

    .swiper-initialized {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }

    .blog-slider {
      &__slider-wrap {
        margin-left: 15px;
        margin-right: 15px;

        .slider-nav-mobile {
          margin-top: 40px;

          ul {
            display: flex;
          }

          li {
            height: 50px;
            width: 50px;
            background-color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            cursor: pointer;

            &:nth-of-type(1) {
              margin-right: 20px;
            }

            svg {
              color: #ffffff;
              z-index: 2;
            }
          }
        }
      }
    }

    .blog-button {
      margin-bottom: 40px;

      .slider-nav {
        display: none;
      }
    }

    .slider-nav-mobile {
      display: block;
    }

  }

`;
export default React.memo(FeatureSlider);