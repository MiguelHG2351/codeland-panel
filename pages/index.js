import Head from "next/head";
import { useState, useEffect } from "react";

import styles from '../styles'

export default function Home() {
    const [data, setData] = useState({ user: [] });
    const [renderData, setRenderData] = useState({ user: [] });

    useEffect(async () => {
        const response = await fetch('/api/getUser')
        const datos = await response.json();
        setData(datos);
        setRenderData(datos);
        console.log(data)
    }, []);

    function fullScreenImage(e) {
        const beforeChild = e.target.previousSibling;
        e.stopPropagation();
        console.log(e.target.parentNode)
        beforeChild.requestFullscreen().then(() => {
            console.log('fullscreen')
        }).catch(err => {
            console.log(err)
            })
    }

    function findUser(e) {
        setRenderData({ user: data.user.filter(user => user.username.includes(e.target.value)) })
    }

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
            <main className="w-11/12 m-auto mt-5">
                <input type="text" className="outline-none p-2" onChange={findUser} placeholder="Buscar usuario" />
                <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {renderData.user.map((item, index) => (
                        <div
                            className="relative overflow-hidden h-60 flex flex-col justify-end border mt-7 md:mt-0 border-gray-600 rounded-lg shadow-md transform"
                            key={index}
                        >
                            <img
                                src={item.cover}
                                className="show-image cover absolute top-0 left-0 w-full h-full z-1- object-cover"
                                alt={item.username}
                                loading="lazy"
                            />
                            <div className="make-fullscreen" onClick={fullScreenImage}>
                                <svg className="pointer-events-none" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 14H5V19H10V17H7V14ZM5 10H7V7H10V5H5V10ZM17 17H14V19H19V14H17V17ZM14 5V7H17V10H19V5H14Z" fill="#fff"/>
                                </svg>
                            </div>
                            <div className="user-action flex justify-between items-center text-white p-3 w-full bg-purple-700">
                                <div className="user-info">
                                    <h2>{item.username}</h2>
                                    <p>Projectos: {item.projects.length}</p>
                                    <p>Ingreso: {new Date(item.created_at).toLocaleString("es-es", { weekday: "short", day: 'numeric', month: 'short' })}</p>
                                </div>
                                <div className="user-profile">
                                    <button className="p-2 bg-green-600 rounded-md">Editar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <style jsx>
                {styles}
            </style>
        </>
    );
}
