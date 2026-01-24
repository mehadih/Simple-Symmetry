import React from 'react';
import styled from 'styled-components';
import {GoArrowLeft, GoArrowRight} from "react-icons/go";
import {primary} from "@/styles/globalStyleVars";

const NavigationIcon = ({next_id, prev_id, color}) => {


    return (

        <StyledNavigationIcon className={'navigation_button'}>
            <ul>
                <li className='hover_left' id={next_id ? next_id : 'service-prev'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
                        <g id="Button_-_Nav_-_L" data-name="Button - Nav - L" transform="translate(45 45) rotate(180)">
                            <g id="Base" fill="none" stroke={`${color ? color : '#26201e'}`} stroke-width="1"
                               opacity="0.3">
                                <rect width="45" height="45" stroke="none"/>
                                <rect x="0.5" y="0.5" width="44" height="44" fill="none"/>
                            </g>
                            <g id="Arrow" transform="translate(-1293.25 -226)">
                                <line id="Line_12400" data-name="Line 12400" x2="5" y2="5"
                                      transform="translate(1318.5 243.5)" fill="none"
                                      stroke={`${color ? color : '#26201e'}`}
                                      stroke-linecap="round" stroke-width="1"/>
                                <line id="Line_12401" data-name="Line 12401" y1="5" x2="5"
                                      transform="translate(1318.5 248.5)" fill="none"
                                      stroke={`${color ? color : '#26201e'}`}
                                      stroke-linecap="round" stroke-width="1"/>
                                <line id="Line_12402" data-name="Line 12402" x2="15" transform="translate(1308 248.5)"
                                      fill="none" stroke={`${color ? color : '#26201e'}`} stroke-linecap="round"
                                      stroke-width="1"/>
                            </g>
                            <g id="Hover_Prev" fill="none" stroke={`${color ? color : '#26201e'}`} opacity="0"
                               stroke-width="1" stroke-dasharray="0 200">
                                <rect width="45" height="45" stroke="none"/>
                                <rect x="0.5" y="0.5" width="44" height="44" fill="none"/>
                            </g>
                        </g>
                    </svg>

                </li>
                <li className='hover_right' id={prev_id ? prev_id : 'service-next'}>
                    <svg id="Button_-_Nav_-_R" data-name="Button - Nav - R" xmlns="http://www.w3.org/2000/svg"
                         width="45" height="45" viewBox="0 0 45 45">
                        <g id="Base" fill="none" stroke={`${color ? color : '#26201e'}`} stroke-width="1" opacity="0.3">
                            <rect width="45" height="45" stroke="none"/>
                            <rect x="0.5" y="0.5" width="44" height="44" fill="none"/>
                        </g>
                        <g id="Arrow" transform="translate(-1293.25 -226)">
                            <line id="Line_12400" data-name="Line 12400" x2="5" y2="5"
                                  transform="translate(1318.5 243.5)" fill="none"
                                  stroke={`${color ? color : '#26201e'}`}
                                  stroke-linecap="round" stroke-width="1"/>
                            <line id="Line_12401" data-name="Line 12401" y1="5" x2="5"
                                  transform="translate(1318.5 248.5)" fill="none"
                                  stroke={`${color ? color : '#26201e'}`}
                                  stroke-linecap="round" stroke-width="1"/>
                            <line id="Line_12402" data-name="Line 12402" x2="15" transform="translate(1308 248.5)"
                                  fill="none" stroke={`${color ? color : '#26201e'}`} stroke-linecap="round"
                                  stroke-width="1"/>
                        </g>
                        <g id="Hover_Next" fill="none" stroke={`${color ? color : '#26201e'}`} opacity="0"
                           stroke-width="1" stroke-dasharray="0 200">
                            <rect width="45" height="45" stroke="none"/>
                            <rect x="0.5" y="0.5" width="44" height="44" fill="none"/>
                        </g>
                    </svg>

                </li>
            </ul>
        </StyledNavigationIcon>

    )
};


const StyledNavigationIcon = styled.div`
  position: relative;
  z-index: 10;

  ul {
    display: flex;

    li {
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      overflow: hidden;

      &:nth-of-type(1) {
        margin-right: 20px;
      }

      svg {
        color: #3C3C3B;
        z-index: 2;

        g {
          transition: 0.7s all ease;
        }
      }


      &:hover {
        #Arrow{
          line{
            stroke: ${primary};
          }
        }
        #Hover_Prev {
          stroke-dasharray: 180px 200px;
          opacity: 1;
          stroke: ${primary};
        }

        #Hover_Next {
          stroke-dasharray: 180px 200px;
          opacity: 1;
          stroke: ${primary};
        }
      }

    }
  }



`;

export default React.memo(NavigationIcon);














