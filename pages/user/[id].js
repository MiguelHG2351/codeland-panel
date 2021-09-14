import { useRouter } from "next/router";

export default function userInfo() {
    const router = useRouter();
    const { id } = router.query;
    console.log(id);

    return (
        <>
            <main>
                <h1>Hola</h1>
                <p>{id}</p>
            </main>
        </>
    );
}
