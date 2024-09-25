import { type SVGProps } from 'react';

const Add = (props: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        {...props}
    >
        <path d="M10.5 22V13.5H2V10.5H10.5V2H13.5V10.5H22V13.5H13.5V22H10.5Z" />
    </svg>
);

export default Add;
