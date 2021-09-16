import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { Provider as AuthProvider } from 'next-auth/client'
import globalStyles from '../styles/global'

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
                    <style jsx global>
                        {globalStyles}
                    </style>
                </Layout>
            </AuthProvider>
        </>
    )
}

export default myApp
