interface Props {
    paginate: (delta: number) => void;
}

const Pagination: React.FC<Props> = ({ paginate }) => {
    return (
        <div className="mx-auto m-8 p-5 w-44 flex flex-row justify-between text-3xl">
            <button
                className="bg-gradient-to-r from-green-600 to-green-300 p-2 rounded-full w-12 h-12 transition hover:-translate-x-2 shadow-lg "
                onClick={() => paginate(-1)}
            >
                &larr;
            </button>
            <button
                className="bg-gradient-to-r from-green-600 to-green-300 p-2 rounded-full w-12 h-12 transition hover:translate-x-2 shadow-lg"
                onClick={() => paginate(1)}
            >
                &rarr;
            </button>
        </div>
    );
};

export default Pagination;
