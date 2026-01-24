'use client'
import React from 'react';
import styled from 'styled-components';
import Link from "next/link";
import {primary, Transition, text} from "@/styles/globalStyleVars";
import arrow from '@/public/images/static/arrow-right.svg'
import Image from "next/image";

const Button = ({
                    onSubmit,
                    text,
                    src,
                    img,
                    hoverImg,
                    fontSize,
                    fontWeight,
                    color,
                    letterSpacing,
                    lineHeight,
                    margin,
                    background,
                    borderRadius,
                    border,
                    width,
                    height,
                    hoverBackground,
                    target,
                    borderColor,
                    hoverColor,
                    icon,
                    marginSm,
                    onClick,
                    className,
                    hoverBorder,
                }) => {


    return (
        <StyledBtn onClick={onClick} className={`${className ? className : null} dc-btn fade-up`}
                   fontSize={fontSize}
                   fontWeight={fontWeight}
                   color={color}
                   background={background}
                   lineHeight={lineHeight}
                   letterSpacing={letterSpacing}
                   margin={margin}
                   border={border}
                   img={img}
                   borderRadius={borderRadius}
                   width={width}
                   hoverImg={hoverImg}
                   hoverBackground={hoverBackground}
                   height={height}
                   borderColor={borderColor}
                   target={target}
                   hoverColor={hoverColor}
                   onSubmit={onSubmit}
                   icon={icon}
                   marginSm={marginSm}
                   hoverBorder={hoverBorder}
        >
            {src && typeof src === 'string' ? (
                src?.startsWith('http') || src?.startsWith('www') ? (
                    <a href={src} target="_blank" rel="noopener noreferrer">
                        <span>{text} <Image height={11.41} width={16} src={icon ? icon : arrow} alt=""/></span>
                    </a>
                ) : (
                    <Link href={src || '/'}>
                        <span>{text} <Image height={11.41} width={16} src={icon ? icon : arrow} alt=""/></span>
                    </Link>
                )
            ) : (
                <a target={target || '_self'}>
                    <span>{text} <Image height={11.41} width={16} src={icon ? icon : arrow} alt=""/></span>
                </a>
            )}

        </StyledBtn>
    )
};

const StyledBtn = styled.div`
  &.dc-btn {
    margin: ${props => props.margin || '0'};
    width: ${props => props.width || 'fit-content'};
    height: ${props => props.height || '34'}px;
    cursor: pointer;

    a {
      display: flex;
      width: fit-content;
      height: 100%;
      align-items: center;
      justify-content: center;
      font-size: ${props => props.fontSize || '14'}px;
      font-weight: ${props => props.fontWeight || 500};
      margin: 0;
      line-height: ${props => props.lineHeight || '18'}px;
      background-color: ${props => props.background || `#FFF`};
      position: relative;
      border-radius: ${props => props.borderRadius || '22'}px;
      overflow: hidden;
      z-index: 0;
      transition: border .3s ease;
      padding: 12px 36px;
      box-sizing: border-box;
      border: 1px solid ${primary};
      color: ${props => props.color || `${text}`};

      span {
        transition: color .3s ease;
        color: ${props => props.color || `${text}`};
        position: relative;
        z-index: 2;

        img {
          padding-bottom: 2px;
          padding-left: 5px;
          transition: .6s ${Transition};
          filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(38deg) brightness(107%) contrast(103%);
            // ${p => !p.icon && `display:none`}
        }
      }

      &:before {
        //bottom: 0;
        content: "";
        display: block;
        position: absolute;
        right: 0;
        top: 100%;
        left: 0;
        background-color: ${p => p.hoverBackground || primary};
        height: 100%;
        width: 100%;
        margin: auto;
        transition: all .5s ${Transition};
        border-radius: 22px;
        border-color: ${p=> p.hoverBorder || ''};
      }

      &:hover {
        span {
          color: ${props => props.hoverColor || `#FFF`};
        }

        img {
          filter: invert(20%) sepia(20%) saturate(0%) hue-rotate(149deg) brightness(106%) contrast(102%);
        }

        &:before {
          top: 0
        }
      }

      &:focus {
        color: #222222;
      }
    }

    @media (max-width: 600px) {
      ${p => p.marginSm ? `margin:${p.marginSm}` : ''}
    }
  }




`;


export default Button;
