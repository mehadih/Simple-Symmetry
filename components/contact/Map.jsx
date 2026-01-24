"use client";
import styled from "styled-components";


const Map = ({data}) => {
    return (
        <>
            <StyledComponent className={"maps"}>
                <iframe
                    src={data?.section_data?.short_desc}
                    width="600"
                    height="450"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                />
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`
  position: relative;
  overflow: hidden;
  height: 80vh;
  iframe {
    position: absolute;
    height: 100%;
    width: 100%;
    inset: 0;
    border: none;
  }
`;

export default Map;
