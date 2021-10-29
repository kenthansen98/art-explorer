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

const Type: NextPage = ({
    type,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [pageIndex, setPageIndex] = useState(1);
    const router = useRouter();
    const { id } = router.query;

    return (
        <Layout>
            <h1>{type.name}</h1>
            <ArtPage
                url={`https://api.harvardartmuseums.org/object?classification=${id}&page=${pageIndex}&apikey=a2b50ae3-c012-44fd-ba12-615b396945ea`}
            />
            <div style={{ display: "none" }}>
                <ArtPage
                    url={`https://api.harvardartmuseums.org/object?classification=${id}&page=${
                        pageIndex + 1
                    }&apikey=a2b50ae3-c012-44fd-ba12-615b396945ea`}
                />
            </div>
            <button onClick={() => setPageIndex(pageIndex - 1)}>
                Previous
            </button>
            <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
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
