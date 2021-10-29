import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import TypeList from "../components/TypeList";
import Layout from "../components/Layout";

export interface ArtType {
    objectcount: number;
    name: string;
    id: number;
    lastupdate: string;
    classificationid: number;
}

const Home: NextPage = ({
    types,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Layout>
            <TypeList types={types} />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(
        "https://api.harvardartmuseums.org/classification?sort=name&apikey=a2b50ae3-c012-44fd-ba12-615b396945ea&size=60"
    );
    const data = await res.json();
    const types: ArtType[] = data.records;

    return {
        props: {
            types,
        },
    };
};

export default Home;
