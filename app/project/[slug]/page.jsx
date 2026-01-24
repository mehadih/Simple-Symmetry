
import reactHtmlParser from "react-html-parser";
import ProjectDetails from "@/components/project/ProjectDetails";
import {getProjectDetailsApi} from "@/api/api";

export async function generateMetadata({ params, searchParams }, parent) {
    const getData = await getProjectDetailsApi(params.slug)


    return {
        title: {
            default: `${getData?.data?.product_data?.meta_title} | Simple Symmetry`,
        },
        description: `${getData?.data?.product_data?.meta_description}`,
        openGraph: {
            title: `${getData?.data?.product_data?.og_title}`,
            description: `${getData?.data?.product_data?.og_description}`,
            images: [
                {
                    url: `${getData?.data?.images?.list?.filter(f=>f?.video != 'on')?.[0]?.full_path}`,
                    alt: `${getData?.data?.product_data?.meta_title}`,
                },
            ],
        },
    };
}

export default async function PortfolioDetail({params}) {
    const getData = await getProjectDetailsApi(params.slug)


    return (
        <>
            <ProjectDetails data={getData}/>
        </>
    );
};

