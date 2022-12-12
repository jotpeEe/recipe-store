/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './client/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                '1to2': '1fr 2fr',
            },
            colors: {
                primary: '#129575',
                secondary: '#71B1A1',
            },
            spacing: {
                section: '35rem',
            },
            boxShadow: {
                card: '0px 2px 8px 0px rgba(95, 126, 155, 0.3)',
            },
        },
        fontFamily: {
            sans: ['Poppins', 'system-ui', 'sans-serif'],
            sans2: ['Roboto', 'system-ui', 'sans-serif'],
        },
    },
    plugins: [],
};
