type ButtonProps = {
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children }) => (
    <button className="flex px-12 py-4 items-center justify-center w-fit bg-primary gap-2 text-white font-semibold rounded-xl">
        {children}
        <svg
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M7.74219 0.35664C7.50602 0.609384 7.50685 1.01828 7.74404 1.26994L11.5934 5.35411H0.939397L0.857159 5.36C0.561344 5.40276 0.333344 5.67296 0.333344 5.99991C0.333344 6.35658 0.604683 6.64571 0.939397 6.64571H11.5921L7.744 10.7298L7.68518 10.8021C7.50865 11.0545 7.52751 11.4133 7.74223 11.6431C7.97841 11.8958 8.36214 11.8966 8.59931 11.645L13.4739 6.47209C13.5873 6.35927 13.6601 6.2006 13.6661 6.0238C13.6722 5.85006 13.6129 5.67418 13.4881 5.54177L8.59928 0.354673L8.53118 0.2923C8.29354 0.105257 7.95689 0.126872 7.74219 0.35664Z" />
        </svg>
    </button>
);

export default Button;
