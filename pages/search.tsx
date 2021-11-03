import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/Layout";
import ArtPage from "../components/ArtPage";
import Pagination from "../components/Pagination";

const Search: NextPage = () => {
    const [pageIndex, setPageIndex] = useState(1);

    const router = useRouter();
    const { searchTerm } = router.query;

    const paginate = (delta: number) => {
        setPageIndex(pageIndex + delta);
    };

    return (
        <Layout>
            <h3 className="font-semibold text-3xl mb-6 mx-5">
                Results for{" "}
                <span className="font-bold text-blue-700">
                    &quot;{searchTerm}&quot;
                </span>
            </h3>
            <ArtPage
                url={`https://api.harvardartmuseums.org/object?q=${searchTerm}&page=${pageIndex}&size=9&apikey=${process.env.NEXT_PUBLIC_HARVARD_API_KEY}`}
            />
            <div style={{ display: "none" }}>
                <ArtPage
                    url={`https://api.harvardartmuseums.org/object?q=${searchTerm}&page=${
                        pageIndex + 1
                    }&size=9&apikey=${process.env.NEXT_PUBLIC_HARVARD_API_KEY}`}
                />
            </div>
            <Pagination paginate={paginate} />
        </Layout>
    );
};

export default Search;
