import { ArtType } from "../pages";
import Type from "./Type";

interface Props {
    types: ArtType[];
}

const TypeList: React.FC<Props> = ({ types }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-14 mx-5">
            {types.map((type, i) => (
                <Type type={type} key={i} />
            ))}
        </div>
    );
};

export default TypeList;
