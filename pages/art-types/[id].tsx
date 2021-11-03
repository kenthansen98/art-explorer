import Layout from "../../components/Layout";
import {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
    NextPage,
} from "next";
import { ArtType } from "..";
import { useState } from "react";
import ArtPage from "../../components/ArtPage";
import { useRouter } from "next/dist/client/router";
import Pagination from "../../components/Pagination";

const Type: NextPage = ({
    type,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [pageIndex, setPageIndex] = useState(1);
    const router = useRouter();
    const { id } = router.query;

    const paginate = (delta: number) => {
        setPageIndex(pageIndex + delta);
    };

    return (
        <Layout>
            <h1 className="font-bold text-3xl mb-6 mx-5">{type.name !== '(not assigned)' ? type.name : 'Not Assigned'}</h1>
            <ArtPage
                url={`https://api.harvardartmuseums.org/object?classification=${id}&page=${pageIndex}&size=9&apikey=a2b50ae3-c012-44fd-ba12-615b396945ea`}
            />
            <div style={{ display: "none" }}>
                <ArtPage
                    url={`https://api.harvardartmuseums.org/object?classification=${id}&page=${
                        pageIndex + 1
                    }&size=9&apikey=a2b50ae3-c012-44fd-ba12-615b396945ea`}
                />
            </div>
            <Pagination paginate={paginate} />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await fetch(
        `https://api.harvardartmuseums.org/classification/${params?.id}?apikey=a2b50ae3-c012-44fd-ba12-615b396945ea`
    );
    const type: ArtType = await res.json();

    return {
        props: {
            type,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(
        "https://api.harvardartmuseums.org/classification?apikey=a2b50ae3-c012-44fd-ba12-615b396945ea&size=60"
    );
    const data = await res.json();
    const types: ArtType[] = data.records;

    const paths = types.map((type) => ({
        params: { id: type.id.toString() },
    }));

    return { paths, fallback: false };
};

export default Type;
