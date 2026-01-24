'use client';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import {
    LightgalleryProvider,
    LightgalleryItem,
} from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css"


const MyComponent = ({data}) => {

    const PhotoItem = ({image, thumb, group}) => (
        <LightgalleryItem group={group} src={image} thumb={thumb}>
            <img src={image} alt=''/>
            {/*<img src={image} alt=""/>*/}
        </LightgalleryItem>

    );


    const lockScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const unlockScroll = () => {
        document.body.style.overflow = '';
    };
    return (
        <StyledComponent>
            <Container>
                <LightgalleryProvider
                    lightgallerySettings={{
                        download: false,
                        thumbnail: false,
                        fullScreen: false,
                        share: false
                    }}
                    onAfterOpen={lockScroll}
                    onCloseAfter={unlockScroll}
                >
                    <Row>
                        {
                            data?.images?.length > 0 &&
                            data?.images?.map((e,i)=>{
                                return(
                                    <Col key={0} sm={4} key={i}>
                                        <div className="gallery-single">
                                            <PhotoItem image={e?.full_path} group="group1"/>
                                        </div>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </LightgalleryProvider>
            </Container>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  padding-top: 60px;
  .container{
    text-align: center;
  }
  h2{
    color: #001A94;
    text-align: center;
    font-size: 60px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
    margin-bottom: 40px;
  }

  .col-sm-4 {
    padding: 0 8px;
    margin-bottom: 17px;
  }

  .gallery-single {
    cursor: pointer;
    padding-top: calc(300 / 450 * 100%);
    position: relative;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (max-width: 767px) {
    .col-sm-4 {
      flex: 0 0 50%;
      max-width: 50%;
      padding: 0 5px;
      margin-bottom: 10px;
    }

  }
`;

export default MyComponent;
