import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import Head from "next/head";

export async function getServerSideProps(context) {
    console.log(context.query);
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
        setData(await data.json());        

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
            <main>
                <div className="image flex items-center gap-4">
                    <img src={data.cover} className="w-32 h-32 object-cover rounded-full border-2 border-white" alt={data.username} />
                    <div className="user-main text-white">
                        <p className="font-bold text-xl">{data.username}</p>
                        <p className="text-sm text-gray-400">{data.email}</p>
                    </div>
                </div>
                <div className="progress">
                    <div className="projects">
                        
                    </div>
                    <div className="fragments">

                    </div>
                    <div className="blogs">

                    </div>
                </div>
            </main>
        </>
    );
}
