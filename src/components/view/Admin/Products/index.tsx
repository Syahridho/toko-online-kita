import { useEffect, useState } from "react";
import ModalAddProducts from "./ModalAddProduct";
import Button from "@/components/UI/Button";
import Image from "next/image";
import convertIDR from "@/utils/currency";
import { FaRegTrashCan, FaPenToSquare, FaPlus } from "react-icons/fa6";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";

import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const AdminProductView = (props: any) => {
  const { products } = props;

  const { back } = useRouter();

  const [productData, setProductData] = useState<any>([]);

  const [addProduct, setAddProduct] = useState<boolean>(false);
  const [updateProduct, setUpdateProduct] = useState<any>({});
  const [deleteProduct, setDeleteProduct] = useState<any>({});

  useEffect(() => {
    setProductData(products.data);
  }, [products]);

  return (
    <>
      <div className="shadow mb-1 p-1">
        <Button
          type="button"
          className="!w-fit text-2xl px-2 !bg-none"
          onClick={() => back()}
        >
          <IoArrowBackCircleOutline />
        </Button>
        <h1 className="absolute top-3 left-1/2 transform -translate-x-1/2">
          Produk
        </h1>
        <Button
          type="button"
          className="!w-fit p-4 fixed right-5 bottom-5"
          onClick={() => setAddProduct(true)}
        >
          <FaPlus />
        </Button>
      </div>
      <div className="flex flex-col gap-2 m-2">
        {productData?.length > 0 ? (
          productData.map((product: any) => (
            <div
              key={product.id}
              className="flex justify-between border rounded shadow p-3 bg-slate-50"
            >
              <div className="flex gap-3">
                <Image
                  width={100}
                  height={100}
                  src={product.image}
                  alt={product.id}
                  className="rounded shadow-sm"
                />
                <div>
                  <h1 className="text-slate-800 tracking-wide">
                    {product.title}
                  </h1>
                  <h2 className="text-slate-600">
                    {convertIDR(product.price)}
                  </h2>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <button
                  className="text-white bg-blue-600 rounded p-2 shadow h-fit"
                  onClick={() => setUpdateProduct(product)}
                >
                  <FaPenToSquare />
                </button>
                <button
                  className="text-white bg-red-600 rounded p-2 shadow h-fit "
                  onClick={() => setDeleteProduct(product)}
                >
                  <FaRegTrashCan />
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center text-slate-400 mt-12">Data kosong</h1>
        )}
      </div>
      {addProduct && (
        <ModalAddProducts
          setAddProduct={setAddProduct}
          setProductData={setProductData}
        />
      )}
      {Object.keys(updateProduct).length > 0 ? (
        <ModalUpdateProduct
          updateProduct={updateProduct}
          setUpdateProduct={setUpdateProduct}
          setProductData={setProductData}
        />
      ) : null}
      {Object.keys(deleteProduct).length > 0 ? (
        <ModalDeleteProduct
          deleteProduct={deleteProduct}
          setDeleteProduct={setDeleteProduct}
          setProductData={setProductData}
        />
      ) : null}
    </>
  );
};

export default AdminProductView;
