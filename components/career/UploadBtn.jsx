'use client'
import React from 'react';
import styled from 'styled-components';
import Link from "next/link";

const Button = ({
                    onSubmit,
                    text,
                    src,
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
                    iconColor,
                    marginSm,
                    onClick,
                    className,
                    lineColor,
                    gap
                }) => {


    return (
        <StyledBtn onClick={onClick} className={`${className ? className : null} up-btn fade-up`}
                   fontSize={fontSize}
                   fontWeight={fontWeight}
                   color={color}
                   background={background}
                   lineHeight={lineHeight}
                   letterSpacing={letterSpacing}
                   margin={margin}
                   border={border}
                   borderRadius={borderRadius}
                   width={width}
                   hoverBackground={hoverBackground}
                   height={height}
                   borderColor={borderColor}
                   target={target}
                   hoverColor={hoverColor}
                   onSubmit={onSubmit}
                   iconColor={iconColor}
                   marginSm={marginSm}
                   lineColor = {lineColor}
                   gap = {gap}
        >
            {src && typeof src === 'string' ? (
                src?.startsWith('http') || src?.startsWith('www') ? (
                    <a href={src} target="_blank" rel="noopener noreferrer">
                        <span>{text}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                            <g id="Group_25437" data-name="Group 25437" transform="translate(-657 -1600.5)">
                                <line id="Line_2" data-name="Line 2" y2="10" transform="translate(663 1601.5)"
                                      fill="none" stroke="#e0091e" stroke-linecap="square" stroke-width="2"/>
                                <line id="Line_12432" data-name="Line 12432" y2="10"
                                      transform="translate(668 1606.5) rotate(90)" fill="none" stroke="#e0091e"
                                      stroke-linecap="square" stroke-width="2"/>
                            </g>
                        </svg>


                    </a>
                ) : (
                    <Link href={src || '/'}>
                        <span>{text}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                            <g id="Group_25437" data-name="Group 25437" transform="translate(-657 -1600.5)">
                                <line id="Line_2" data-name="Line 2" y2="10" transform="translate(663 1601.5)"
                                      fill="none" stroke="#e0091e" stroke-linecap="square" stroke-width="2"/>
                                <line id="Line_12432" data-name="Line 12432" y2="10"
                                      transform="translate(668 1606.5) rotate(90)" fill="none" stroke="#e0091e"
                                      stroke-linecap="square" stroke-width="2"/>
                            </g>
                        </svg>


                    </Link>
                )
            ) : (
                <a target={target || '_self'}>
                    <span>{text}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                        <g id="Group_25437" data-name="Group 25437" transform="translate(-657 -1600.5)">
                            <line id="Line_2" data-name="Line 2" y2="10" transform="translate(663 1601.5)" fill="none"
                                  stroke="#e0091e" stroke-linecap="square" stroke-width="2"/>
                            <line id="Line_12432" data-name="Line 12432" y2="10"
                                  transform="translate(668 1606.5) rotate(90)" fill="none" stroke="#e0091e"
                                  stroke-linecap="square" stroke-width="2"/>
                        </g>
                    </svg>


                </a>
            )}

        </StyledBtn>
    )
};

const StyledBtn = styled.div`
    &.up-btn {
        margin: ${props => props.margin || '0'};
        width: ${props => props.width || 'fit-content'};
        cursor: pointer;

        a {
            display: flex;
            gap: ${props => props.gap || '78'}px;
            align-items: center;
            width: fit-content;
            height: 100%;
            justify-content: center;
            font-size: ${props => props.fontSize || '16'}px;
            font-weight: ${props => '400' || `${fontweight.bold}`};
            margin: 0;
            line-height: ${props => props.lineHeight || '24'}px;
            letter-spacing: -0.48px;
            background-color: ${props => props.background || `transparent`};
            position: relative;
            overflow: hidden;
            z-index: 0;
            transition: border .3s ease;
            box-sizing: border-box;
            border: ${p => p.border || "0"};
            
            &::before{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                height: 2px;
                width: 100%;
                background-color: ${props => props.lineColor || `#F5EFE6`};
                border-radius: unset !important;
                transition: height 0.5s ease-in-out;
            }

            span {
                transition: color .3s ease;
                color: ${props => props.color || `#F5EFE6`};
                position: relative;
                z-index: 2;
            }

            &:hover {
                span {
                    color: ${props => props.color || `#F5EFE6`};
                }
                
                &::before {
                    height: 5px;
                    transition: height 0.5s ease-in-out;
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
