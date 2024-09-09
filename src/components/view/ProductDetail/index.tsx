import Button from "@/components/UI/Button";
import productServices from "@/services/product";
import userServices from "@/services/user";
import convertIDR from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ProductDetailView = () => {
  const {
    query: { id },
    back,
    push,
    asPath,
  } = useRouter();
  const session: any = useSession();

  const [productDetail, setProductDetail] = useState<any>({});
  const [carts, setCarts] = useState<any>({});

  const getProductDetail = async () => {
    const { data } = await productServices.getDetailProduct(id as string);
    setProductDetail(data.data);
  };

  const getCart = async () => {
    const { data } = await userServices.getCart();
    setCarts(data.data);
  };

  const handleAddToCart = async () => {
    let newCarts = [];
    if (carts?.filter((item: any) => item.id === id).length > 0) {
      newCarts = carts.map((item: any) => {
        if (item.id === id) {
          item.qty += 1;
        }
        return item;
      });
    } else {
      newCarts = [
        ...carts,
        {
          id: id,
          qty: 1,
        },
      ];
    }

    try {
      const result = await userServices.addToCart({
        carts: newCarts,
      });
      if (result.status === 200) {
        console.log("berhasil");
      } else {
        console.log("gagal");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {};

  useEffect(() => {
    try {
      getProductDetail();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart();
    }
  }, [session]);

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
        <button
          className="py-2 px-12 rounded shadow border border-slate-800 text-slate-800 mr-2"
          onClick={() => {
            session.status === "unauthenticated"
              ? push(`/auth/login?callbackUrl=${asPath}`)
              : handleAddToCart();
          }}
        >
          keranjang
        </button>
        <button
          className="py-2 px-12 rounded shadow border border-slate-800 bg-slate-800 text-white mr-2"
          onClick={() => {
            session.status === "unauthenticated"
              ? push(`/auth/login?callbackUrl=${asPath}`)
              : handleBuy();
          }}
        >
          Beli
        </button>
      </div>
    </div>
  );
};

export default ProductDetailView;
