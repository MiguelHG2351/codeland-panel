import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from '../../styles/profile'

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if(session === null) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

export default function userInfo() {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState(null);
    
    useEffect(async () => {
        const data = await fetch(`/api/getUser?id=${id}`);
        const response = await data.json();
        setData(response);
    }, [])

    if(data === null) {
        return <div>Loading...</div>
    }
    return (
        <>
            <Head>
                <title>{data.username} | Codeland</title>
                <link rel="shortcut icon" href={data.cover} type="image/x-icon" />
            </Head>
            <main className="w-4/5 m-auto">
                <div className="image flex items-center gap-4">
                    <img src={data.cover} className="w-32 h-32 object-cover rounded-full border-2 border-white" alt={data.username} />
                    <div className="user-main text-white">
                        <p className="font-bold text-xl">{data.username}</p>
                        <p className="text-sm text-gray-400">{data.email}</p>
                    </div>
                </div>
                <div className="progress text-white mt-6">
                    <h3>Datos principales</h3>
                    <div className="progress-info flex gap-4 mt-4">
                        <div className="projects w-4/12 p-3 overflow-hidden overflow-ellipsis">
                            <span className="text-md font-bold">
                                Proyectos
                            </span>
                            <br/>
                            <div className="border-l-4 border-blue-700 pl-2 py-2">
                                {data.projects_count}
                            </div>
                        </div>
                        <div className="fragments w-4/12 p-3 overflow-hidden overflow-ellipsis">
                            <span className="text-md font-bold">
                                Blogs<br/>
                            </span>
                            <div className="border-l-4 border-blue-700 pl-2 py-2">
                                {data.blogs_count}
                            </div>
                        </div>
                        <div className="blogs w-4/12 p-3 overflow-hidden overflow-ellipsis">
                            <span className="text-md font-bold">
                                Fragments<br/>
                            </span>
                            <div className="border-l-4 border-blue-700 pl-2 py-2">
                                {data.fragments_count}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <style jsx>
                {styles}
            </style>
        </>
    );
}
