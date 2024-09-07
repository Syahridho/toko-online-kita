import Button from "@/components/UI/Button";
import productServices from "@/services/product";
import convertIDR from "@/utils/currency";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ProductView = () => {
  const {
    query: { id },
    back,
  } = useRouter();

  const [productDetail, setProductDetail] = useState<any>({});

  console.log(productDetail);

  const getProductDetails = async () => {
    const { data } = await productServices.getDetailProduct(id as string);
    setProductDetail(data.data);
  };

  useEffect(() => {
    try {
      getProductDetails();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="z-50">
      <Button
        type="button"
        className="!w-fit text-2xl px-2 !bg-none absolute left-4 top-4"
        onClick={() => back()}
      >
        <IoArrowBackCircleOutline />
      </Button>
      <div>
        <Image
          width={100}
          height={100}
          src={productDetail.image}
          alt={productDetail.title}
          className="w-full h-64 object-cover mx-auto"
        />
        <div className="p-3">
          <h1 className="text-xl">{productDetail.title}</h1>
          <h1>{convertIDR(productDetail.price)}</h1>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 w-full py-4 bg-slate-200 flex justify-end">
        <button className="py-2 px-12 rounded shadow bg-slate-800 text-white mr-8">
          Beli
        </button>
      </div>
    </div>
  );
};

export default ProductView;
