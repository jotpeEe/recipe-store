import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head />
            <body>
                <Main />
                <div id="root-modal" />
                <NextScript />
            </body>
        </Html>
    );
}
