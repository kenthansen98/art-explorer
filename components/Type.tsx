import { ArtType } from "../pages";
import Link from "next/link";

interface Props {
    type: ArtType;
}

const Type: React.FC<Props> = ({ type }) => {

    return (
        <Link href={`art-types/${type.id}`}>
            <a>
                <div className="p-5 bg-white shadow-lg rounded-lg transition transform hover:scale-105 flex flex-row justify-between">
                    <span className="font-semibold mx-1">{type.name !== "(not assigned)"
                        ? type.name
                        : "Not Assigned"}</span>
                    <span className="text-blue-600 font-medium">{type.objectcount.toLocaleString()}</span>
                </div>
            </a>
        </Link>
    );
};

export default Type;
