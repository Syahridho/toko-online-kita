import Button from "@/components/UI/Button";
import productServices from "@/services/product";
import userServices from "@/services/user";
import convertIDR from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";

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
  const [toggleQty, setToggleQty] = useState(false);
  const [itemQty, setItemQty] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProductDetail = async (id: string) => {
    try {
      const { data } = await productServices.getDetailProduct(id);
      setProductDetail(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getCart = async () => {
    try {
      const { data } = await userServices.getCart();
      setCarts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async () => {
    let newCarts = [];
    if (carts?.filter((item: any) => item.id === id).length > 0) {
      newCarts = carts.map((item: any) => {
        if (item.id === id) {
          item.qty += itemQty;
        }
        return item;
      });
    } else {
      newCarts = [
        ...carts,
        {
          id: id,
          qty: itemQty,
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
    getProductDetail(id as string);
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
        className="!w-fit text-2xl px-2 !bg-none absolute left-4 top-4 z-50"
        onClick={() => back()}
      >
        <IoArrowBackCircleOutline />
      </Button>
      <div>
        {isLoading ? (
          <>
            <Skeleton height={200} />
            <div className="p-3">
              <Skeleton />
              <Skeleton width={100} />
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      {isLoading ? (
        <div className="fixed bottom-0 right-0 w-full">
          <Skeleton height={50} />
        </div>
      ) : (
        <div className="fixed bottom-0 right-0 w-full py-8 px-2 bg-slate-200">
          <div
            className={`gap-2 border-2 border-slate-600 justify-between w-20 p-1 rounded text-slate-600 transition duration-500 ${
              toggleQty ? "flex" : "hidden"
            }`}
          >
            <button
              onClick={() => setItemQty(itemQty - 1)}
              disabled={itemQty <= 1}
            >
              <FaMinus />
            </button>
            <h1>{itemQty}</h1>
            <button onClick={() => setItemQty(itemQty + 1)}>
              <FaPlus />
            </button>
          </div>
          <div className="flex justify-end">
            <button
              className="py-2 px-12 rounded shadow border border-slate-800 text-slate-800 mr-2"
              onClick={() => {
                session.status === "unauthenticated"
                  ? push(`/auth/login?callbackUrl=${asPath}`)
                  : toggleQty
                  ? handleAddToCart()
                  : setToggleQty(true);
              }}
            >
              keranjang
            </button>
            <button
              className="py-2 px-12 rounded shadow border border-slate-800 bg-slate-800 text-white mr-2"
              onClick={() => {
                session.status === "unauthenticated"
                  ? push(`/auth/login?callbackUrl=${asPath}`)
                  : toggleQty
                  ? handleBuy()
                  : setToggleQty(true);
              }}
            >
              Beli
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailView;
