import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { Provider as AuthProvider } from 'next-auth/client'

// Components
import Layout from '../components/Layout'

function myApp({ Component, pageProps }) {
    return (
        <>
            <AuthProvider session={pageProps.session}>
                <Head>
                    <meta name="author" content="Miguel Hernández, Michelle Calderón, Gabriela Robleto" />
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </>
    )
}

export default myApp
