import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
    const [data, setData] = useState({ user: [] });

    useEffect(async () => {
        const response = await fetch('/api/getUser')
        const datos = await response.json();
        setData(datos);
        console.log(data)
    }, []);

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
            <main>
                <input type="text" className="p-2" placeholder="Buscar usuario" />
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
                                loading="lazy"
                            />
                            <div className="user-action text-white p-3 w-full bg-purple-700">
                                <h2>{item.username}</h2>
                                <p>Projectos: {item.projects.length}</p>
                                <p>Ingreso: {new Date(item.created_at).toLocaleString("en-us", { weekday: "short", day: 'numeric', month: 'short' })}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
