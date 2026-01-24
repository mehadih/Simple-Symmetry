'use client'
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import Title from "../Title";
import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ProjectBox from "@/components/project/ProjectBox";
import NavigationIcon from "@/components/NavigationIcon";

const BlogSliderV1 = ({data,title}) => {


    // SwiperCore.use([Autoplay]);
    let leftRef = useRef();
    let rightRef = useRef();
    let mLeftRef = useRef();
    let mRightRef = useRef();
    let containerRef = useRef();
    let sliderRef = useRef();
    const [current, setCurrent] = useState('')
    let [offset, setOffset] = useState(90)
    let [theWidth, SetTheWidth] = useState(0)
    let [activeNumber, setActiveNumber] = useState(1)
    let [totalNumber, setTotalNumber] = useState(5)


    useEffect(() => {
        setOffset(containerRef.current?.offsetLeft)
        const handleResize = () => {
            setOffset(containerRef.current?.offsetLeft)
            SetTheWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        // slider number - with safety check
        const getActiveItem = document.querySelector('.swiper-pagination-current')?.innerHTML
        const getTotalItem = document.querySelector('.swiper-pagination-total')?.innerHTML
        if (getActiveItem) setActiveNumber(getActiveItem)
        if (getTotalItem) setTotalNumber(getTotalItem)

        return () => window.removeEventListener('resize', handleResize)
    }, [])


    useEffect(() => {
        const getTotalItem = 5
        setTotalNumber(getTotalItem)
    }, [data])
    let sliderNumber = () => {
        const getActiveItem = document.querySelector('.swiper-pagination-current')?.innerHTML
        // const getTotalItem = document.querySelector('.swiper-pagination-total').innerHTML
        setActiveNumber(getActiveItem)
        // setTotalNumber(getTotalItem)
    }


    console.log('data', data)
    return (
        <StyledBlog offset={offset} className='blog-slider pt-160 pb-160'>
            <Container ref={containerRef}>
                <Row>
                    <Col sm={12}>

                        <div className="blog-button">
                            {/*<Title text={'Discover our exquisite </br> <span>Discover our exquisite  </span>'}/>*/}
                            <Title  noanim text={title}/>
                            <NavigationIcon next_id={'act-next'} prev_id={'act-prev'}/>
                        </div>
                    </Col>
                </Row>
            </Container>

            <div className={` fade-up blog-slider__slider-wrap`}>
                <div className="blog-slider__slider-wrap__inner">
                    {
                        data && data.length>0 &&
                        <Swiper loop={false}
                                spaceBetween={30}
                                slidesPerView={3}
                                allowSlideNext={true}
                                allowSlidePrev={true}
                                allowTouchMove={true}
                                speed={900}
                                pagination={{
                                    type: "fraction",
                                }}
                                navigation={{
                                    prevEl: '#act-next',
                                    nextEl: '#act-prev',
                                }}
                                modules={[Autoplay, Pagination, Navigation]}

                                breakpoints={{
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 30,
                                    },
                                    767: {
                                        slidesPerView: 2,
                                        spaceBetween: 30,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                }}
                                onSlideChange={(s) => sliderNumber()}

                            // navigation={true} modules={[Navigation]}
                                onSwiper={(swiper) => console.log(swiper)}

                                ref={sliderRef}>

                            {
                                // filteredData && filteredData.length>0 &&
                                data.map((element, key)=>{
                                    return(
                                        <SwiperSlide key={key}>
                                            <ProjectBox
                                                link={`/project/${element?.product_data?.slug}`}
                                                title={element?.product_data?.title}
                                                type={element?.product_data?.type}
                                                location={element?.product_data?.location}
                                                katha={element?.product_data?.katha}
                                                img={element?.images?.list?.find(f=>f?.thumb === 'on')?.full_path}
                                            />
                                        </SwiperSlide>
                                    )
                                })
                            }


                        </Swiper>
                    }
                </div>

                {/*<div className="slider-nav-mobile">*/}
                {/*    <ul>*/}
                {/*        <li className="hover slider_prev">*/}
                {/*            <svg stroke="currentColor" fill="currentColor" stroke-width="0"*/}
                {/*                 viewBox="0 0 16 16" height="1em" width="1em"*/}
                {/*                 xmlns="http://www.w3.org/2000/svg">*/}
                {/*                <path fill-rule="evenodd"*/}
                {/*                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path>*/}
                {/*            </svg>*/}
                {/*        </li>*/}
                {/*        <li className="hover slider_next">*/}
                {/*            <svg stroke="currentColor" fill="currentColor" stroke-width="0"*/}
                {/*                 viewBox="0 0 16 16" height="1em" width="1em"*/}
                {/*                 xmlns="http://www.w3.org/2000/svg">*/}
                {/*                <path fill-rule="evenodd"*/}
                {/*                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>*/}
                {/*            </svg>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        </StyledBlog>
    );
};

const StyledBlog = styled.section`




  .blog-button {
    display: flex;
    justify-content: space-between;
    margin-bottom: 85px;
    align-items: end;

    .slider-nav {
      ul {
        display: flex;
      }

      li {
        height: 40px;
        width: 40px;
        //background-color: rgb(34, 31, 31);
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        border: 1px solid black;

        &:nth-of-type(1) {
          margin-right: 20px;
        }

        svg {
          z-index: 2;
        }

        &:hover {
          border: 1px solid #AC8B7C;
        }

      }
    }
  }

  .swiper-button-next, .swiper-button-prev {
    position: absolute;
    height: 40px;
    width: 40px;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 99;
    background-color: red;
  }

  .swiper-button-next, .swiper-button-prev, .swiper-pagination {
    opacity: 0;
    visibility: hidden;
  }

  .swiper-initialized {
    //padding-right: 300px;
    //padding-left: 300px;
      // margin-right: ${props => props.offset + 15}px;
    margin-left: ${props => props.offset + 15}px;
    padding-right: ${props => props.offset + 15}px;
    
    @media(max-width: 767px){
      margin-left: 0px;
      padding-right: 0px;
      
    }
  }

  .slider-nav-mobile {
    display: none;
  }

  .blog-slider {
    &__slider-wrap {
      &__inner {
        .blog-single {
          &__inner {
            padding-top: 115%;
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    .swiper-container {
      margin-left: 0;
      padding-right: 0;
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
            //background-color: black;
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
      display: block;

      .slider-nav {
        margin-top: 30px;
      }
    }

    .slider-nav-mobile {
      display: block;
    }
    
    
    .navigation_button{
      margin-top: 30px;
    }

  }

`;
export default BlogSliderV1;