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
            <div className="md:grid grid-cols-3 gap-3 w-11/12 m-auto">
                {data.user.map((item, index) => (
                    <div
                        className="relative overflow-hidden flex items-end border mt-7 md:mt-0 border-gray-600 dark:bg-purple-600 h-80 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-90"
                        key={index}
                    >
                        <img
                            src={item.cover}
                            className="cover absolute top-0 left-0 w-full h-full z-1- object-cover"
                            alt={item.username}
                        />
                        <div className="user-action text-white p-3 w-full bg-purple-700">
                            <h2>{item.username}</h2>
                            <p>Projectos: {item.projects.length}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export async function getStaticProps() {
    //get current route

    // const fetchig = await fetch('https://api.github.com/users/mike-b-miller');
    const URI = `${
        config.isDevelopment
            ? "http://localhost:3000"
            : "https://codeland-panel.vercel.app"
    }/api/getUser`;

    const fetching = await fetch(URI);
    const data = await fetching.json();

    return {
        props: {
            data,
        },
    };
}
