'use client';
import React from 'react';
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import Title from "@/components/Title";
import {offWhite} from "@/styles/globalStyleVars";



const OurClient = ({data}) => {

    return (
        <StyledComponent id={'features'} className='feature pt-160 pb-160'>
            <Container>
                <Title margin={'0 0 50px 0'} noanim text={data?.section_data?.subtitle}/>
                <div className="slider" style={{width: '100%'}}>
                    {
                        data?.images?.list && data?.images?.list?.length > 0 &&
                        data?.images?.list?.map((e,i)=>{
                            return(
                                <div  className='feature__single' key={i}>
                                    <div className='feature__single__img'>
                                        <img src={e?.full_path}/>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </Container>
        </StyledComponent>
    );
};
const StyledComponent = styled.section`
  background-color: ${offWhite};
  .slider{
    width: calc(33.33% - 20px);
    height: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, auto);
  }
    .feature{
      &__title{
        h5{
          color: #fff;
          margin-bottom: 60px;
        }
      }
      &__single{
       display: flex;
        justify-content: center;
        height: 195px;
        border-top: 1px solid rgb(37 41 44/5%);
        border-right: 1px solid rgb(37 41 44/5%);
        cursor: pointer;
        
        &__img{
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 19px 17px;
        }
        &:first-child{
          border-left: 1px solid rgb(37 41 44/5%);
        }
        :nth-child(6n + 1){
          border-left: 1px solid rgb(37 41 44/5%);
        }
        &:nth-last-child(-n+6) {
          border-bottom: 1px solid rgb(37 41 44/5%);
        }
        
        
        &:hover{
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          transition: 0.3s all ease-in-out;
        }
      }
    }

  @media(max-width: 767px) {
    .slider {
      grid-template-columns: repeat(2, 1fr); /* 2 items in 1 row for mobile */
      
    }
    .feature{
      &__title{
        h5{
          margin-bottom: 30px;
        }
      }
      &__single{
        border: 1px solid rgb(37 41 44/5%);
      }
    }
  }
`;
export default React.memo(OurClient);