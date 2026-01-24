import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'
import ImageParallax from "@/components/ImageParallax";
import reactHtmlParser from "react-html-parser";

const ProjectDescription = ({data}) => {
    return (
        <StyledComponent>
            <div className={'banner'}>
                <ImageParallax src={data?.images?.[0]?.full_path} alt={'banner'}/>
            </div>

            <div className="desc">
                {
                    reactHtmlParser(data?.data?.description)
                }
            </div>
        </StyledComponent>
    );
};

const StyledComponent = styled.div`

`;

export default ProjectDescription;
