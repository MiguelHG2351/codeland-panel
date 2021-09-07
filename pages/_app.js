import Head from 'next/head'
import 'tailwindcss/tailwind.css'

// Components
import Layout from '../components/Layout'

function myApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="author" content="Miguel Hernández" />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}

export default myApp
