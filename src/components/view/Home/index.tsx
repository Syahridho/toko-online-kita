import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import productServices from "@/services/product";
import convertIDR from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

const HomeView = () => {
  const { push } = useRouter();

  const [productData, setProductData] = useState([]);

  const getProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProductData(data.data);
  };

  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="p-2">
      <div className="flex gap-4 items-center justify-center">
        <Input type="text" id="search" name="search" placeholder="Search" />
        <Link
          href={"/cart"}
          className="!w-fit p-2 !h-full mt-0 text-gray-600 bg-white shadow border border-grey-400"
        >
          <IoCartOutline />
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {productData.map((product: any) => (
          <div
            key={product.id}
            className="flex gap-3 p-3 border rounded shadow-sm cursor-pointer"
            onClick={() => push(`/products/${product.id}`)}
          >
            <Image
              width={100}
              height={100}
              src={product.image}
              alt={product.id}
              className="rounded"
            />
            <div className="flex flex-col">
              <h1>{product.title}</h1>
              <h3>{convertIDR(product.price)}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
