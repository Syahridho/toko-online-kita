import AdminProductView from "@/components/view/Admin/Products";
import productServices from "@/services/product";
import Head from "next/head";
import { useEffect, useState } from "react";

const AdminProductPages = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <Head>
        <title>Admin Products</title>
      </Head>
      <AdminProductView products={products} />
    </>
  );
};

export default AdminProductPages;
