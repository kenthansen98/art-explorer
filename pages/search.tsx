import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/Layout";
import ArtPage from "../components/ArtPage";

const Search: NextPage = () => {
    const [pageIndex, setPageIndex] = useState(1);

    const router = useRouter();
    const { searchTerm } = router.query;

    return (
        <Layout>
            <h3>Search term: {searchTerm}</h3>
            <ArtPage
                url={`https://api.harvardartmuseums.org/object?q=${searchTerm}&page=${pageIndex}&size=9&apikey=a2b50ae3-c012-44fd-ba12-615b396945ea`}
            />
            <div style={{ display: "none" }}>
                <ArtPage
                    url={`https://api.harvardartmuseums.org/object?q=${searchTerm}&page=${pageIndex + 1}&size=9&apikey=a2b50ae3-c012-44fd-ba12-615b396945ea`}
                />
            </div>
            <button onClick={() => setPageIndex(pageIndex - 1)}>
                Previous
            </button>
            <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        </Layout>
    );
};

export default Search;
