import productServices from "@/services/product";
import convertIDR from "@/utils/currency";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    <div>
      <div className="mt-12">
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
