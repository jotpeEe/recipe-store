/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const plugin = require('tailwindcss/plugin');
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './client/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            gridTemplateColumns: {
                '1to2': '1fr minmax(0, 2fr)',
                slider: 'repeat(12, minmax(0, 1fr)',
                fill: 'repeat(auto-fill, minmax(200px, 1fr))',
                slides: 'repeat(auto-fill, minmax(175px, 1fr))',
                panel: 'repeat(auto-fill, minmax(125px, 270px))',
                '3/4': 'repeat(auto-fill, minmax(200px, 300px))',
            },
            gridTemplateRows: {
                profile: 'repeat(6, minmax(0, 140px))',
            },
            colors: {
                primary: '#129575',
                secondary: '#71B1A1',
                nav: 'hsla(0,0%,100%,.75)',
                input: 'rgb(227, 230, 232)',
                border: '#e5e7eb',
                outlined: '#9ca3af',
                'text-primary': '#000',
                muted: 'hsl(240, 3.8%, 46.1%)',
            },
            screens: {
                mobile: '825px',
                xs: '384px',
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
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
        fontFamily: {
            sans: ['Poppins', 'system-ui', 'sans-serif'],
            sans2: ['Roboto', 'system-ui', 'sans-serif'],
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        plugin(({ addVariant }) => {
            addVariant('children', '&>*');
            addVariant('range', '&::webkit-slider-thumb');
        }),
    ],
};
