import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import productServices from "@/services/product";
import convertIDR from "@/utils/currency";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";

const HomeView = () => {
  const { push } = useRouter();

  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProducts = async () => {
    try {
      const { data } = await productServices.getAllProducts();
      setProductData(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
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
      <div className="mt-4 flex flex-col gap-2 mb-24">
        {isLoading
          ? [...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4 p-2 border shadow rounded">
                <div className="w-1/5">
                  <Skeleton width={100} height={100} />
                </div>
                <div className="w-4/5">
                  <Skeleton className="mb-3 " />
                  <div className="w-1/2">
                    <Skeleton />
                  </div>
                </div>
              </div>
            ))
          : productData.map((product: any) => (
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
                  loading="lazy"
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
