import AdminProductView from "@/components/view/Admin/Products";
import Head from "next/head";

const AdminProductPages = () => {
  return (
    <>
      <Head>
        <title>Admin Products</title>
      </Head>
      <AdminProductView />
    </>
  );
};

export default AdminProductPages;
