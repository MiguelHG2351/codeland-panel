import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/client";

import styles from '../styles'

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if(session === null) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

export default function Home() {
    const [data, setData] = useState({ user: [] });
    const [renderData, setRenderData] = useState({ user: [] });
    const router = useRouter();
    const [ session, loading ] = useSession();
    console.log(session, loading);

    useEffect(async () => {
        const response = await fetch('/api/getUsers')
        const datos = await response.json();

        setData(datos);
        setRenderData(datos);
    }, []);

    function fullScreenImage(e) {
        const beforeChild = e.target.previousSibling;
        e.stopPropagation();
        beforeChild.requestFullscreen().then(() => {
            console.log('fullscreen')
        }).catch(err => {
            console.log(err)
        })
    }

    function findUser(e) {
        setRenderData({ user: data.user.filter(user => user.username.includes(e.target.value)) })
    }

    function openProfile(e) {
        const userID = e.target.dataset.id
        const URL = `/user/${userID}`	
        router.push(URL)
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
                <input type="text" className="outline-none mb-5 p-2 rounded-md" onChange={findUser} placeholder="Buscar usuario" />
                <p className="text-white font-medium text-xl">Estudiantes totales: {renderData.user.length}</p>
                <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {renderData.user.map((item, index) => (
                        <div
                            className="relative overflow-hidden h-60 flex flex-col justify-end border border-gray-600 rounded-lg shadow-md transform"
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
                                    <p>Projectos: {item.projects[0].length}</p>
                                    <p>Ingreso: {new Date(item.created_at).toLocaleString("es-es", { weekday: "short", day: 'numeric', month: 'short' })}</p>
                                </div>
                                <div className="user-profile">
                                    <button onClick={openProfile} data-id={item._id} className="p-2 bg-green-600 rounded-md">Editar</button>
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
