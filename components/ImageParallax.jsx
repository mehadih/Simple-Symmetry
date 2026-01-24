"use client";
import styled from 'styled-components';

const ImageParallax = ({src, srcSm, alt, objectFit, position,height, width, banner, left, margin, right, top, bottom}) => {


    return (
        <StyledImg className='global-image' objectFit={objectFit} margin={margin} position={position} left={left}
                   right={right} top={top}
                   bottom={bottom} height={height} width={width}>
            <img data-speed={0.8} src={src} alt={alt || ''}/>
        </StyledImg>
    );
};

const StyledImg = styled.div`
  position: ${props => props.position || 'absolute'};
  height: ${props => props.height || '100%'};
  width: ${props => props.width || '100%'};
  top: ${props => props.top || 0};
  left: ${props => props.left || 0};
  bottom: ${props => props.bottom || 0};
  right: ${props => props.right || 0};
  margin: ${props => props.margin || 0};
    overflow: hidden;

  img {
    width: 100%;
    height: 110%;
    object-fit: ${props => props.objectFit || 'cover'};
    position: absolute;
      top: -30px;
    left: 0;
    right: 0;
    bottom: 0;
      
      @media (max-width: 767px) {
          top: 0 !important;
      }
      
      @media(max-width: 991px) {
          
      }
  }
}`;

export default ImageParallax;