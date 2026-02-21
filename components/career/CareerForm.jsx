"use client";
import styled from "styled-components";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {primary, text} from "@/styles/globalStyleVars";
import Button from "@/components/Button";
import UploadBtn from "@/components/career/UploadBtn";
import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import reactHtmlParser from "react-html-parser";

const MyComponent = ({ contactText, globalContact, data }) => {
    const [isSubmit, setIsSubmitting] = useState(false);
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitSuccessful, isSubmitting },
        reset,
    } = useForm({
        mode: "all",
    });


    //--- form submit
    const success = (msg) =>
        toast.success(msg, {
            position: "top-right",
            autoClose: 4000,
            closeOnClick: true,
            progress: undefined,
        });

    const error = (msg) =>
        toast.error(msg, {
            position: "top-right",
            autoClose: 4000,
            closeOnClick: true,
            progress: undefined,
        });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("name", data?.name);
            formData.append("email", data?.email);
            formData.append("phone", data?.phone);
            formData.append("cover", data?.message);
            formData.append("file", cv);
            formData.append("form_id", "career-form");

            const response = await axios.post(
                "https://cms.mehadih.info/api/post-req-data/form-submit",
                formData
            );

            if (response.status === 200) {
                success("Form submitted successfully");
                reset(); // Reset form fields
                setUploadText("Upload CV*");
                setCv(null);
            } else {
                error("Failed to submit form. Please try again later.");
            }
        } catch (err) {
            error("Failed to submit form. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const [uploadText, setUploadText] = useState("Attach Resume");
    const [cv, setCv] = useState(null);
    const [cvError, setCvError] = useState(null);
    const cvRef = useRef();

    const handleUploadClick = () => {
        cvRef.current.click();
    };

    const handleUpload = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const fileName = selectedFile.name;
            const fileSize = selectedFile.size;
            const fileType = selectedFile.type;

            if (fileType !== "application/pdf") {
                setCvError("Please upload a PDF file.");
                setUploadText("Upload CV*");
                setCv(null);
            } else if (fileSize > 2 * 1024 * 1024) {
                // 2MB limit
                setCvError("File size should be less than 2MB.");
                setUploadText("Upload CV*");
                setCv(null);
            } else {
                setCv(selectedFile);
                setUploadText(fileName);
                setCvError(null);
                document.querySelector(".gph_upload").classList.add("hide");
            }
        }
    };

    return (
        <StyledComponent className={"contacts pb-160 pt-160"}>
            <Container>
                <Row className={"contacts__form"}>
                    <Col sm={{ offset: 4, span: 8 }} className={"contacts__form__submit"}>
                        <h3 className="split-left">
                            {reactHtmlParser(data?.section_data?.subtitle)}
                        </h3>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className={"form-group"}>
                                <Form.Control
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Please enter your name",
                                        },
                                    })}
                                    type="text"
                                    placeholder="Name *"
                                    disabled={isSubmitting}
                                />
                                <p className={"form-error"}>{errors.name?.message}</p>
                            </Form.Group>

                            <div className="form-flex">
                                <div className="single">
                                    <Form.Group className={"form-group"}>
                                        <Form.Control
                                            {...register("phone", {
                                                required: "Please enter your phone number",
                                                pattern: {
                                                    value: /^01[0-9]{9}$/,
                                                    message: "Please enter a valid 11 digit phone number",
                                                },
                                            })}
                                            type="number"
                                            placeholder="Phone *"
                                            disabled={isSubmitting}
                                        />
                                        <p className={"form-error"}>{errors.phone?.message}</p>
                                    </Form.Group>
                                </div>
                                <div className="single">
                                    <Form.Group className={"form-group"}>
                                        <Form.Control
                                            {...register("email", {
                                                required: "Please enter your email",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Please enter a valid email address",
                                                },
                                            })}
                                            type="email"
                                            placeholder="Email *"
                                            disabled={isSubmitting}
                                        />
                                        <p className={"form-error"}>{errors.email?.message}</p>
                                    </Form.Group>
                                </div>
                            </div>

                            <Form.Group className={"form-group"}>
                <textarea
                    {...register("message", {
                        required: {
                            value: true,
                            message: "Please enter a valid message",
                        },
                    })}
                    type="text"
                    placeholder="Cover Letter *"
                    disabled={isSubmitting}
                />
                                <p className={"form-error"}>{errors.message?.message}</p>
                            </Form.Group>
                            <div className={"submit-btn"}>
                                <Form.Group className={"upload"}>
                                    <Form.Control
                                        ref={cvRef}
                                        onChange={handleUpload}
                                        className={"gph_upload"}
                                        text={uploadText}
                                        type="file"
                                        accept=".pdf"
                                        disabled={isSubmitting}
                                    />
                                </Form.Group>
                                <UploadBtn
                                    text={uploadText}
                                    iconColor={"#E0091E"}
                                    lineColor={"#E0091E"}
                                    color={"#E0091E"}
                                    onClick={handleUploadClick}
                                />
                                <Button text={'Submit'} onClick={handleSubmit(onSubmit)} color={'#FFFFFF'} background={primary} border={'1px'} hoverColor={'#56575A'} hoverBackground={'#FFFFFF'} hoverBorder={primary} borderColor={primary}/>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  position: relative;
  overflow: hidden;

  .contacts__form {
    
    h3 {
      color: #26201e;
      font-size: 48px;
      font-weight: 900;
      line-height: 64px;
      letter-spacing: -1.92px;
      margin-bottom: 40px !important;
      @media (max-width: 767px) {
        font-size: 32px;
        line-height: 48px;
        letter-spacing: -1.28px;
      }
    }
  }

  .form-control {
    color: ${text} !important;
  }

  input {
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(61 50 41 / 0.5) !important;
    font-size: 16px;
    line-height: 24px;
    color: rgba(61 50 41 / 0.5);
    transition: all 0.1s ease-in-out;

    &:focus {
      color: #3d3229;
      border-bottom: 2px solid #26201e !important;
      transition: all 0.1s ease-in-out;
      outline: none !important;
    }

    &:disabled {
      background-color: #f5f5f5; // Same styling as input
      color: #aaa;
      border-bottom: 1px solid #ddd !important;
      cursor: not-allowed;
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    color: #3d3229 !important;
    -webkit-text-fill-color: #3d3229 !important;
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-background-clip: text !important;
    background-clip: text !important;
  }

  textarea {
    min-height: 130px;
    width: 100%;
    border: none !important;
    border-bottom: 1px solid rgba(61 50 41 / 0.5) !important;

    &:focus {
      color: #3d3229;
      border-bottom: 2px solid #26201e !important;
      transition: all 0.1s ease-in-out;
      outline: none !important;
    }

    &:disabled {
      background-color: #f5f5f5; // Same styling as input
      color: #aaa;
      border-bottom: 1px solid #ddd !important;
      cursor: not-allowed;
    }
  }

  .form-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;

    .single {
      flex: 1;
      min-width: calc(50% - 15px); /* Adjust for the gap */
      box-sizing: border-box;
    }
  }

  .submit-btn {
    padding-top: 20px;
    display: flex;
    gap: 30px;

    .up-btn {
      max-width: 200px;
      min-width: 200px;
      height: 40px;
      svg {
        min-width: 12px;
      }
      a {
        width: 100%;
      }
      span {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: normal;
        overflow: hidden;
      }
    }
    .dc-btn {
      max-width: 200px;
      min-width: 200px;
      position: relative;

      a {
        width: 100%;
        &:after {
          width: 100%;
        }
      }
      span {
        width: 100%;
      }
      img {
        position: absolute;
        right: 0px !important;
        top: 0 !important;
        bottom: 0 !important;
        left: auto;
        margin: auto;
      }
    }

    .upload {
      display: none;
    }

    @media (max-width: 767px) {
      flex-direction: column;
      padding-bottom: 20px;
    }
    /* 
    img {
      position: unset !important;
    } */
  }

  .bg-shadow {
    position: absolute;
    width: 100%;
    top: 0;
    height: 70%;
    object-fit: contain;
  }

  .contacts__num {
    margin-bottom: 60px;
    padding-top: 200px;

    h1 {
      font-size: 12px;
      line-height: 16px;
      color: #999999;
      margin-bottom: 15px;
    }

    a {
      font-size: 120px;
      line-height: 120px;
      color: #ffffff;
    }
  }

  .pr-40 {
    padding-right: 40px;
  }

  .contacts__address {
    h4 {
      font-size: 12px;
      line-height: 16px;
      color: #999999;
      margin-bottom: 15px;
    }

    a {
      font-size: 18px;
      line-height: 22px;
      color: #fff;
      display: block;
      width: fit-content;
    }
  }

  .contacts__form {
    p {
      color: #ffffff;
      font-size: 18px;
      line-height: 22px;
    }

    &__submit {
      h4 {
        font-size: 32px;
        line-height: 36px;
        margin: 0 0 40px 0;
        color: #ffffff;
      }
    }
  }

  .form-group {
    position: relative;

    p {
      position: absolute;
      bottom: -20px;
      color: rgb(255, 133, 133);
      font-size: 12px;
    }
  }

  @media (max-width: 1024px) {
    .contacts__num {
      padding-top: 150px;

      a {
        font-size: 100px;
        line-height: 100%;
      }
    }
  }
  @media (max-width: 991px) {
    .contacts__form__submit {
    }
    .contacts__num {
      a {
        font-size: 48px;
        line-height: 48px;
      }
    }

    .contacts__form {
      padding-top: 120px;

      .col-sm-5,
      .col-sm-6 {
        min-width: 100%;
      }

      &__submit {
        margin: 120px 0 0 0;
        min-width: 100%;
      }
    }
  }
  @media (max-width: 600px) {
    .contacts__address {
      min-width: 100%;

      &:not(:nth-last-of-type(1)) {
        margin-bottom: 40px;
      }
    }
  }

  @media (max-width: 380px) {
    .contacts__num {
      a {
        font-size: 40px;
        line-height: 40px;
        white-space: nowrap;
      }
    }
  }

  @media (max-width: 767px) {
    img {
      top: 0;
      left: 0;
    }

    .contacts__form {
      padding-top: 0;

      &__submit {
        margin: 0;
      }

      .form-flex {
        flex-direction: column;
        gap: 0;
      }
    }
  }
`;

export default MyComponent;
