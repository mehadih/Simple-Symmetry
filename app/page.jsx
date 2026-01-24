import BannerSlider from "@/components/home/BannerSlider";
import AboutSection from "@/components/home/AboutSection";
import Usp from "@/components/home/Usp";
import BigBanner from "@/components/BigBanner";
import ProjectSlider from "@/components/home/ProjectSlider";
import {getApi} from "@/api/api";
import reactHtmlParser from "react-html-parser";

export async function metadata() {
    const apiValue = "home";
    const getHomeData = await getApi(apiValue)
    const banner = getHomeData?.data?.sections?.find(
        (f) => f?.section_data?.template === "banner_slider"
    );
    return {
        title: {
            default: `${reactHtmlParser(getHomeData?.data?.page_data?.meta_title)} | Simple Symmetry`,
        },
        description: `${getHomeData?.data?.page_data?.meta_description}`,
        openGraph: {
            title: `${getHomeData?.data?.page_data?.og_title}`,
            description: `${getHomeData?.data?.page_data?.og_description}`,
            images: [
                {
                    url: `${banner?.images?.list?.filter(f=>f?.video != 'on')?.[0]?.full_path}`,
                    alt: `${getHomeData?.data?.page_data?.meta_title}`,
                },
            ],
        },
    };
}


export default async function Home() {

    const apiValue = "home";
    const getHomeData = await getApi(apiValue)


    //refactor
    const slider = getHomeData?.data?.sections?.find((f) => f?.section_data?.template === "banner_slider");
    const about = getHomeData?.data?.sections?.find((f) => f?.section_data?.template === "about_us");
    const usp = getHomeData?.data?.sections?.find((f) => f?.section_data?.template === "usp");
    const bigBanner = getHomeData?.data?.sections?.find((f) => f?.section_data?.template === "big_banner");
    const featuredProjects = getHomeData?.data?.sections?.find((f) => f?.section_data?.template === "featured_projects");
    const featuredProjectList = getHomeData?.featured_projects;


    return (
        <>
            <BannerSlider data={slider}/>
            <AboutSection data={about}/>
            <Usp data={usp}/>
            <ProjectSlider data={featuredProjectList} title={featuredProjects?.section_data?.title}/>
            <BigBanner data={bigBanner}/>
        </>
    );
};


