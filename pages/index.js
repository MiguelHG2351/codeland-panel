import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

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

    useEffect(async () => {
        const response = await fetch('/api/getUsers')
        const datos = await response.json();

        setData(datos);
        setRenderData(datos);
    }, []);

    // function fullScreenImage(e) {
    //     const beforeChild = e.target.previousSibling;
    //     e.stopPropagation();
    //     beforeChild.requestFullscreen().then(() => {
    //         console.log('fullscreen')
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    function findUser(e) {
        setRenderData({ user: data.user.filter(user => user.username.includes(e.target.value)) })
    }

    function openProfile(e) {
        const userID = e.target.dataset.id
        const URL = `/user/${userID}`	
        router.push(URL)
    }

    function openOptionAccount(e) {
        const list = e.target.nextSibling
        list.classList.toggle('translate-x-8')
        list.classList.toggle('translate-x-0')
        list.classList.toggle('opacity-0')
        list.classList.toggle('opacity-1')
        list.classList.toggle('pointer-events-none')
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
            <main className="w-10/12 m-auto mt-5">
                <div className="search mb-5">
                    <input type="text" className="outline-none p-2 rounded-md" onChange={findUser} placeholder="Buscar usuario" />
                    <p className="text-white font-medium text-xl">Estudiantes totales: {renderData.user.length}</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {renderData.user.map((item, index) => (
                        <div
                            className="relative card-user shadow-xl overflow-hidden h-64 rounded-lg transform"
                            key={index}
                        >
                            <svg onClick={openOptionAccount} xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-3 h-5 w-5 cursor-pointer" viewBox="0 0 20 20" fill="#eee">
                                <path className="pointer-events-none" d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                            <ul className="action-account overflow-hidden transform translate-x-8 opacity-0 pointer-events-none transition duration-200 easy-in-out absolute bg-white z-20 right-10 top-10 rounded">
                                <li className="cursor-pointer p-2 bg-black bg-opacity-10 hover:bg-red-500 text-black hover:text-white">Borrar cuenta</li>
                            </ul>
                            <div className="user-profile h-52 flex flex-col justify-center items-center">
                                <div className="image relative">
                                    <img
                                        src={item.cover}
                                        className="show-image border-2 border-white cover w-28 h-28 object-cover rounded-full"
                                        alt={item.username}
                                        loading="lazy"
                                        />
                                    <svg className="absolute top-0 left-0 w-28 h-28 pointer-events-none">
                                        <circle className="stroke-current text-blue-700" r="50" cx="56" cy="56" strokeWidth="4" fill="none" />
                                    </svg>
                                </div>
                                <div className="user-info text-center text-white">
                                    <h2 className="font-bold text-lg">{item.username}</h2>
                                    <p className="text-gray-400 text-sm overflow-ellipsis">{item.email}</p>
                                    <p className="text-gray-400 text-sm overflow-ellipsis" title={item.projects[0].map(p => p.project_name).join(', ')}>
                                        Projectos: {item.projects[0].length}
                                    </p>
                                </div>
                            </div>
                            {/* <div className="make-fullscreen self-start" onClick={fullScreenImage}>
                                <svg className="pointer-events-none" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 14H5V19H10V17H7V14ZM5 10H7V7H10V5H5V10ZM17 17H14V19H19V14H17V17ZM14 5V7H17V10H19V5H14Z" fill="#fff"/>
                                </svg>
                            </div> */}
                            <div onClick={openProfile} data-id={item._id} className="user-action border border-indigo-600 rounded-b-lg flex items-center justify-center h-12 text-blue-700 text-lg font-medium p-3 w-full bg-white hover:bg-transparent cursor-pointer">
                                Editar
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
