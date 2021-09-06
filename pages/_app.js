import Head from 'next/head'
import 'tailwindcss/tailwind.css'

function myApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="author" content="Miguel Hernández" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default myApp
