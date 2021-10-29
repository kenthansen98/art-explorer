import useSWR from "swr";

interface Props {
    url: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ArtPage: React.FC<Props> = ({ url }) => {
    const { data } = useSWR(
        url,
        fetcher
    );

    return (
        <div>
            {(data?.records as any[])?.map((object) => (
                <div key={object.id}>{object.title}</div>
            ))}
        </div>
    );
};

export default ArtPage;
