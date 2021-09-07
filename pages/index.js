import Head from "next/head";
import config from "config";

export default function Home({ data }) {
    return (
        <>
            <Head>
                <title>Home Page</title>
                <link
                    rel="shortcut icon"
                    href="/images/favicon.ico"
                    type="image/x-icon"
                />
            </Head>
            <h1>Title</h1>
            <div className="grid grid-cols-3 gap-2">
                {data.user.map((item, index) => (
                    <div className="border border-gray-600 rounded-lg shadow p-3 cursor-pointer transition-transform transform hover:scale-90" key={index}>
                        <img src={item.cover} alt={item.username} />
                        <h2>{item.username}</h2>
                    </div>
                ))}

            </div>
        </>
    );
}

export async function getStaticProps() {
    //get current route

    // const fetchig = await fetch('https://api.github.com/users/mike-b-miller');
    const URI = `${config.isDevelopment ? 'http://localhost:3000' : 'https://codeland-panel.vercel.app'}/api/getUser`

    const fetchig = await fetch(URI);
    const data = await fetchig.json();

    return {
        props: {
            data
        }
    }
}
