const Categories: React.FC = () => (
    <div className="flex gap-3 pb-16">
        <button className="flex justify-center items-center  bg-primary rounded-lg">
            <span className="font-sans text-xs color-white px-5 py-2 text-white font-semibold">
                All
            </span>
        </button>
        <button className="flex justify-center items-center  bg-white rounded-lg">
            <span className="font-sans text-xs color-white px-5 py-2 text-secondary font-semibold">
                Indian
            </span>
        </button>
        <button className="flex justify-center items-center  bg-white rounded-lg">
            <span className="font-sans text-xs color-white px-5 py-2 text-secondary font-semibold">
                Italian
            </span>
        </button>
        <button className="flex justify-center items-center  bg-white rounded-lg">
            <span className="font-sans text-xs color-white px-5 py-2 text-secondary font-semibold">
                Asian
            </span>
        </button>
        <button className="flex justify-center items-center  bg-white rounded-lg">
            <span className="font-sans text-xs color-white px-5 py-2 text-secondary font-semibold">
                Chinese
            </span>
        </button>
        <button className="flex justify-center items-center  bg-white rounded-lg">
            <span className="font-sans text-xs color-white px-5 py-2 text-secondary font-semibold">
                Fruit
            </span>
        </button>
        <button className="flex justify-center items-center  bg-white rounded-lg">
            <span className="font-sans text-xs color-white px-5 py-2 text-secondary font-semibold">
                Vegetables
            </span>
        </button>
        <button className="flex justify-center items-center  bg-white rounded-lg">
            <span className="font-sans text-xs color-white px-5 py-2 text-secondary font-semibold">
                Protein
            </span>
        </button>
    </div>
);

export default Categories;
