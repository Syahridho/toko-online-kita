import Navbar from "@/components/contrainer/Navbar";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { data } = useSession();
  console.log(data);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <div>Hello world</div>
        {data && <h1>{data?.user?.email}</h1>}
        {data ? (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded shadow mt-4"
            onClick={() => signOut()}
          >
            LogOut
          </button>
        ) : (
          <button
            className="bg-slate-800 text-white px-4 py-2 rounded shadow mt-4"
            onClick={() => signIn()}
          >
            SignIn
          </button>
        )}
      </div>
      <Navbar />
    </>
  );
}
