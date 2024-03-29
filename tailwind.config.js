// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './client/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                '1to2': '1fr minmax(0, 2fr)',
                slider: 'repeat(12, minmax(0, 1fr)',
                fill: 'repeat(auto-fill, minmax(125px, 1fr))',
                panel: 'repeat(auto-fill, minmax(125px, 270px))',
            },
            colors: {
                primary: '#129575',
                secondary: '#71B1A1',
                nav: 'hsla(0,0%,100%,.75)',
                input: 'rgb(227, 230, 232)',
                border: '#e5e7eb',
                outlined: '#9ca3af',
                'text-primary': '#000',
            },
            spacing: {
                list: '600px',
                section: '35rem',
                'header-p': '100px',
                'image-sm': '35px',
                image: '56px',
            },
            boxShadow: {
                card: '0px 2px 8px 0px rgba(95, 126, 155, 0.3)',
                form: '0px 10px 34px 0px rgb(95 126 155 / 18%)',
                border: '0px 0px 0px 1px inset',
            },
            minHeight: {
                textarea: '6rem',
            },
            maxWidth: {
                '3/4': '75%',
            },
        },
        fontFamily: {
            sans: ['Poppins', 'system-ui', 'sans-serif'],
            sans2: ['Roboto', 'system-ui', 'sans-serif'],
        },
    },
    plugins: [
        plugin(({ addVariant }) => {
            addVariant('children', '&>*');
        }),
    ],
};
