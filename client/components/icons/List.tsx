import { type SVGProps } from 'react';

const List = (props: SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="none"
    >
        <rect
            x="4"
            y="3"
            width="12"
            height="2"
            rx="1"
            fill="currentColor"
        ></rect>
        <rect
            x="4"
            y="7"
            width="12"
            height="2"
            rx="1"
            fill="currentColor"
        ></rect>
        <rect
            x="4"
            y="11"
            width="3"
            height="2"
            rx="1"
            fill="currentColor"
        ></rect>
        <rect
            x="4"
            y="15"
            width="3"
            height="2"
            rx="1"
            fill="currentColor"
        ></rect>
        <rect
            x="8.5"
            y="11"
            width="3"
            height="2"
            rx="1"
            fill="currentColor"
        ></rect>
        <rect
            x="8.5"
            y="15"
            width="3"
            height="2"
            rx="1"
            fill="currentColor"
        ></rect>
        <rect
            x="13"
            y="11"
            width="3"
            height="2"
            rx="1"
            fill="currentColor"
        ></rect>
    </svg>
);

export default List;
