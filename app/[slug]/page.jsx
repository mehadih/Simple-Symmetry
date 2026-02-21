import InnerBanner from "@/components/InnerBanner";
import {getApi} from "@/api/api";
import MissionVision from "@/components/about/MissionVision";
import AboutSection from "@/components/home/AboutSection";
import UspSection from "@/components/home/Usp";
import ProjectSlider from "@/components/home/ProjectSlider"
import BigBanner from "@/components/BigBanner";
import OurClient from "@/components/about/OurClient";
import ContactInfo from "@/components/contact/ContactInfo";
import Map from "@/components/contact/Map";
import Contact from "@/components/contact/Contact";
import CareerInfo from "@/components/career/CareerInfo";
import CareerForm from "@/components/career/CareerForm";
import ProjectLists from "@/components/project/ProjectLists";
import { notFound } from "next/navigation";

export async function generateMetadata({ params, searchParams }, parent) {
    const getData = await getApi(params.slug)
    const banner = getData?.data?.sections?.find(
        (f) => f?.section_data?.template === "banner"
    );

    return {
        title: {
            default: `${getData?.data?.page_data?.meta_title} | Simple Symmetry`,
        },
        description: `${getData?.data?.page_data?.meta_description}`,
        openGraph: {
            title: `${getData?.data?.page_data?.og_title}`,
            description: `${getData?.data?.page_data?.og_description}`,
            images: [
                {
                    url: `${banner?.images?.list?.filter(f=>f?.video != 'on')?.[0]?.full_path}`,
                    alt: `${getData?.data?.page_data?.meta_title}`,
                },
            ],
        },
    };
}

const componentMap = {
    'inner_banner': InnerBanner,
    'about_us': AboutSection,
    'mission_vision' : MissionVision,
    'usp' : UspSection,
    'featured_projects' : ProjectSlider,
    'big_banner' : BigBanner,
    'clients' : OurClient,
    'contact_info': ContactInfo,
    'map': Map,
    'get_in_touch' : Contact,
    'career_info' : CareerInfo,
    'career_form' : CareerForm,
};

export default async function Page({ params }) {
    let getPageData;


    try {
        getPageData = await getApi(params.slug);
    } catch (error) {
        // If there's an error (e.g., 404), forward to the 404 error page
        return notFound();
    }

    const projects =  getPageData?.projects || [];



    // Check if page data exists
    if (!getPageData || !getPageData.data) {
        return notFound(); // Redirect to 404 page if no page data
    }

    const sections = getPageData.data?.sections || [];


    const components = sections
        .filter(section => componentMap[section.section_data?.template])
        .map((section, index) => {
            const Component = componentMap[section.section_data?.template];

            return <Component key={index} data={section}/>;
        });

    // If no components are rendered, show 404 page
    if (components.length === 0) {
        return notFound();
    }

    return (
        <>
            {components}
            {/*{jobs.length > 0 && <JobList data={jobs} />}*/}
            {projects.length > 0 && <ProjectLists data={projects}/>}
        </>
    );
}
