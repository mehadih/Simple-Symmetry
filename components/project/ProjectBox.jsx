'use client'
import React from 'react';
import styled from 'styled-components';
import {Img} from "@/components/Img";
import {primary, secondary} from "@/styles/globalStyleVars";
import Link from "next/link";

const ProjectBox = ({img, title, link, katha, type, location}) => {


    return (

        <StyledProjectBox>
            <div className="wrapper">
                <Link href={link ? link : '/'}>
                    <div className={'img-wrapper '}>
                        <Img src={img ? img : '/images/dynamic/thumbnail-min.jpeg'}/>
                    </div>
                    <div className="information">
                        <ul>
                            {
                                type &&
                                <li>{type ? type : 'RESIDENTIAL'}</li>

                            }
                            {
                                location &&
                                <li>{location ? location : 'SAYED NAGOR VATARA'}</li>
                            }
                        </ul>
                        {
                            title &&
                            <h3>{title ? title : 'Sayed Nagor Vatara, Dhaka'}</h3>
                        }
                    </div>
                </Link>
            </div>
        </StyledProjectBox>

    )
};


const StyledProjectBox = styled.div`
  .wrapper {
    position: relative;

    .img-wrapper {
      padding-top: calc(460 / 370 * 100%);
      position: relative;
      overflow: hidden;

      img {
        transform: scale(1.01);
        transition: all 0.3s ease-in-out;
      }
    }
    .information {
      margin-top: 30px;
      ul {
        display: flex;

        li {
          font-size: 12px;
          line-height: 24px;
          letter-spacing: 1px;
          color: ${secondary};
          position: relative;
          padding-left: 20px;
          text-transform: uppercase;

          &:after {
            content: '';
            height: 5px;
            width: 5px;
            background: ${primary};
            border-radius: 50%;
            position: absolute;

            right: -12px;
            top: 9px;

          }

          &:first-child {
            padding-left: 0;
          }

          &:last-child {
            &:after {
              display: none;
            }
          }
        }
      }

      h3 {
        font-size: 20px;
        text-transform: uppercase;
        line-height: 24px;
        font-weight: 500;
        color: ${secondary};
        letter-spacing: 0;
      }
    }
    a {
      &:hover {
        .content-hover{
          &:after{
            opacity: 1;
          }
          .contents{
            transform: translateY(0);
          }
        }
        .img-wrapper {
          img {
            transform: scale(1.09);
            transition: all 0.3s ease-in-out;
          }
        }
        .information{
          h3{
            color: ${secondary}
          }
        }
      }
    }

    

  }
`;

export default React.memo(ProjectBox);














