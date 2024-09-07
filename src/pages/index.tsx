import Navbar from "@/components/contrainer/Navbar";
import HomeView from "@/components/view/Home";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <HomeView />
      <Navbar />
    </>
  );
}
