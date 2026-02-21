'use client';
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import Select, { components } from "react-select";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ProjectBox from "@/components/project/ProjectBox";
import Button from "@/components/Button";
import {primary} from "@/styles/globalStyleVars";

// Separate component that uses useSearchParams
function ProjectListsContent({ data }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'all');
    const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
    const [itemsToShow, setItemsToShow] = useState(9);
    const itemsPerLoad = 3;

    // Get unique statuses
    const uniqueStatuses = useMemo(() => {
        if (!data || data.length === 0) return [{ value: 'all', label: 'All Status' }];
        const statuses = new Set(data.map(item => item?.product_data?.category_title).filter(Boolean));
        return [
            { value: 'all', label: 'All Status' },
            ...Array.from(statuses).map(status => ({
                value: status.toLowerCase(),
                label: status
            }))
        ];
    }, [data]);

    // Get unique types
    const uniqueTypes = useMemo(() => {
        if (!data || data.length === 0) return [{ value: 'all', label: 'All Types' }];
        const types = new Set(data.map(item => item?.product_data?.type).filter(Boolean));
        return [
            { value: 'all', label: 'All Types' },
            ...Array.from(types).map(type => ({
                value: type.toLowerCase(),
                label: type
            }))
        ];
    }, [data]);

    const updateURL = (status, type) => {
        const params = new URLSearchParams();
        if (status && status !== 'all') {
            params.set('status', status);
        }
        if (type && type !== 'all') {
            params.set('type', type);
        }
        const queryString = params.toString();
        const newURL = queryString ? `${pathname}?${queryString}` : pathname;
        router.push(newURL, { scroll: false });
    };

    const handleStatusChange = (selectedOption) => {
        const newStatus = selectedOption?.value;
        setSelectedStatus(newStatus);
        updateURL(newStatus, selectedType);
    };

    const handleTypeChange = (selectedOption) => {
        const newType = selectedOption?.value;
        setSelectedType(newType);
        updateURL(selectedStatus, newType);
    };

    // Independent filtering logic with case-insensitive comparison
    const filteredProjects = useMemo(() => {
        if (!data || data.length === 0) return [];

        return data.filter(item => {
            const categoryTitle = item?.product_data?.category_title?.toLowerCase();
            const itemType = item?.product_data?.type?.toLowerCase();

            return (
                (selectedStatus === 'all' || categoryTitle === selectedStatus) &&
                (selectedType === 'all' || itemType === selectedType)
            );
        });
    }, [data, selectedStatus, selectedType]);

    // Update state when URL params change
    useEffect(() => {
        const statusParam = searchParams.get('status') || 'all';
        const typeParam = searchParams.get('type') || 'all';
        setSelectedStatus(statusParam);
        setSelectedType(typeParam);
    }, [searchParams]);

    const handleLoadMore = () => {
        setItemsToShow(prev => prev + itemsPerLoad);
    };

    // Display only the items that should be shown
    const displayedProjects = filteredProjects.slice(0, itemsToShow);

    // Custom dropdown styles
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderRadius: 0,
            color: state.isSelected ? '#FFF' : '#25292C',
            backgroundColor: state.isSelected ? primary : '#ffffff',
            margin: 0,
            cursor: 'pointer',
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: '500',
            "&:hover": {
                backgroundColor: primary,
                color: '#ffffff',
                cursor: 'pointer'
            },
        }),
        menu: (provided, state) => ({
            ...provided,
            color: 'rgba(0,0,0,0.5)',
            backgroundColor: state.isSelected ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)',
            margin: 0,
            zIndex: 9999,
        }),
        menuList: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#000' : '#FFF',
            borderRadius: 0,
            cursor: 'pointer',
            zIndex: 9999,
        }),
    };

    const DropdownIndicator = props => {
        return (
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    {props.selectProps.menuIsOpen ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="11.732" height="7.003" viewBox="0 0 11.732 7.003">
                            <g id="Group_24047" data-name="Group 24047" transform="translate(18853.867 -10435.998)">
                                <g id="Group_24046" data-name="Group 24046" transform="translate(-18852.863 10442.258) rotate(-93)">
                                    <line id="Line_12380" data-name="Line 12380" x2="5" y2="5" fill="none" stroke={primary} strokeLinecap="round" strokeWidth="1"/>
                                    <line id="Line_12381" data-name="Line 12381" y1="5" x2="5" transform="translate(0 5)" fill="none" stroke={primary} strokeLinecap="round" strokeWidth="1"/>
                                </g>
                            </g>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="11.414" height="6.414" viewBox="0 0 11.414 6.414">
                            <g id="Group_22451" data-name="Group 22451" transform="translate(10.707 0.707) rotate(90)">
                                <line id="Line_12380" data-name="Line 12380" x2="5" y2="5" fill="none" stroke={primary} strokeLinecap="round" strokeWidth="1"/>
                                <line id="Line_12381" data-name="Line 12381" y1="5" x2="5" transform="translate(0 5)" fill="none" stroke={primary} strokeLinecap="round" strokeWidth="1"/>
                            </g>
                        </svg>
                    }
                </components.DropdownIndicator>
            )
        );
    };

    return (
        <StyledComponent className={'pb-160'}>
            <Container>
                <Row className={'filter'}>
                    <Col md={4}>
                        <Select
                            components={{ DropdownIndicator }}
                            styles={customStyles}
                            classNamePrefix={'custom'}
                            className='select-here files'
                            placeholder={'All Status'}
                            options={uniqueStatuses}
                            value={uniqueStatuses.find(option => option.value === selectedStatus) || uniqueStatuses[0]}
                            onChange={handleStatusChange}
                        />
                    </Col>
                    <Col md={4}>
                        <Select
                            components={{ DropdownIndicator }}
                            styles={customStyles}
                            classNamePrefix={'custom'}
                            className='select-here files'
                            placeholder={'All Types'}
                            options={uniqueTypes}
                            value={uniqueTypes.find(option => option.value === selectedType) || uniqueTypes[0]}
                            onChange={handleTypeChange}
                        />
                    </Col>
                </Row>
                <Row className={'listing'}>
                    {filteredProjects.length > 0 ? (
                        displayedProjects.map((item, index) => (
                            <Col md={4} key={index}>
                                <ProjectBox
                                    link={`/project/${item?.product_data?.slug}`}
                                    title={item?.product_data?.title}
                                    type={item?.product_data?.type}
                                    location={item?.product_data?.location}
                                    katha={item?.product_data?.katha}
                                    img={item?.images?.list?.find(f=>f?.thumb === 'on')?.full_path}
                                />
                            </Col>
                        ))
                    ) : (
                        <Col className={'no-data-message'}>
                            <p>No projects found matching your criteria.</p>
                        </Col>
                    )}
                </Row>
                {filteredProjects.length > itemsToShow && (
                    <Row className={'load-more-row'}>
                        <Col className={'load-more-col'}>
                            <Button
                                text="Load More"
                                onClick={handleLoadMore}
                                background={primary}
                                color="#FFF"
                                hoverBackground="#FFF"
                                hoverColor={primary}
                                hoverBorder={primary}
                                border={`1px solid ${primary}`}
                            />
                        </Col>
                    </Row>
                )}
            </Container>
        </StyledComponent>
    );
}

// Main component wrapped in Suspense
const MyComponent = ({ data }) => {
    return (
        <Suspense fallback={<div style={{ padding: '80px 0', textAlign: 'center' }}>Loading projects...</div>}>
            <ProjectListsContent data={data} />
        </Suspense>
    );
};

const StyledComponent = styled.section`
  background-color: #F7F3F0;
  padding-top: 80px;

  .filter {
    margin-bottom: 80px;
    @media(max-width: 767px) {
      gap: 20px;
    }
  }

  .custom__control {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid ${primary} !important;
    border-radius: 0;
    box-shadow: none;
    outline: none !important;
    cursor: pointer;
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    padding: 0;

    .custom__placeholder, .custom__single-value {
      color: #25292C;
      font-size: 15px;
      line-height: 20px;
    }

    .custom__value-container {
      padding-left: 0;
    }
    .custom__dropdown-indicator {
      padding: 0;
    }
  }

  .listing{
    .col-md-4{
      margin-bottom: 30px;
      &:nth-last-child(-n + 3){
        margin-bottom: 0;
      }
    }

    .no-data-message {
      text-align: center;
      padding: 60px 20px;
      width: 100%;

      p {
        font-size: 18px;
        color: #25292C;
        margin: 0;
        font-weight: 500;
      }
    }
  }

  .load-more-row {
    margin-top: 60px;
    .load-more-col {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export default MyComponent;