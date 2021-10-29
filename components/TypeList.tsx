import { ArtType } from "../pages";
import Link from "next/link";

interface Props {
    types: ArtType[];
}

const TypeList: React.FC<Props> = ({ types }) => {
    return (
        <div className="grid grid-cols-3 gap-10 py-14">
            {types.map((type, i) => (
                <Link href={`art-types/${type.id}`} key={i}>
                    <a>
                        <div className="p-5 flex bg-white shadow-lg rounded-lg">{type.name !== "(not assigned)" ? type.name : "Not Assigned"}</div>
                    </a>
                </Link>
            ))}
        </div>
    );
};

export default TypeList;
