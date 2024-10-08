import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <div id="modals" />
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
