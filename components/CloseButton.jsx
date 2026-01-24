import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'

const MyComponent = () => {
    return (
        <StyledComponent className={'close-button'}>
            <svg className="initial-close" xmlns="http://www.w3.org/2000/svg" width="11.414" height="11.414"
                 viewBox="0 0 11.414 11.414">
                <g id="Group_23146" data-name="Group 23146" transform="translate(-1077.294 -689.293)">
                    <line id="Line_12415" data-name="Line 12415" x1="14.142"
                          transform="translate(1078.001 690) rotate(45)" fill="none" stroke="#CF0A0A"
                          stroke-linecap="round" stroke-width="1"></line>
                    <line id="Line_12416" data-name="Line 12416" x1="14.142"
                          transform="translate(1078.001 700) rotate(-45)" fill="none" stroke="#CF0A0A"
                          stroke-linecap="round" stroke-width="1"></line>
                </g>
            </svg>
        </StyledComponent>
    );
};

const StyledComponent = styled.div`

`;

export default MyComponent;
