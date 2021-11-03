import useSWR from "swr";
import Image from "next/image";

interface Props {
    url: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ArtPage: React.FC<Props> = ({ url }) => {
    const { data } = useSWR(url, fetcher)
    console.log(url);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mx-5">
            {(data?.records as any[])?.map((object) => (
                <div
                    className="p-5 bg-white shadow-lg rounded-lg transition hover:scale-105"
                    key={object.id}
                >
                    {object?.images?.length > 0 && (
                        <Image
                            src={object?.images[0].baseimageurl}
                            alt={object.title}
                            width={400}
                            height={400}
                            className="object-contain"
                        />
                    )}
                    {object.title}
                </div>
            ))}
        </div>
    );
};

export default ArtPage;
