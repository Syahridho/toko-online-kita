import Button from "@/components/UI/Button";
import productServices from "@/services/product";
import userServices from "@/services/user";
import convertIDR from "@/utils/currency";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";

const CartView = () => {
  const session: any = useSession();
  const { back, push } = useRouter();

  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCart = async () => {
    try {
      const { data } = await userServices.getCart();
      setCarts(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await productServices.getAllProducts();
      setProducts(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getProduct = (id: string) => {
    const product: any = products.find((product: any) => product.id === id);
    return product;
  };

  const getTotalPrice = () => {
    const total = carts?.reduce(
      (acc: number, item: { id: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0
    );
    return total;
  };

  const handlePlusCart = async (id: string) => {
    let data = [];
    data = carts.map((item: any) => {
      if (item.id === id) {
        item.qty += 1;
      }
      return item;
    });

    setCarts(data);

    try {
      const result = await userServices.addToCart({ carts: data });

      if (result.status === 200) {
        console.log("berhasil");
      } else {
        console.log("gagal");
      }
    } catch (error) {
      console.log("gagal");
    }
  };

  const handleMinusCart = async (id: string) => {
    let data = [];
    data = carts.map((item: any) => {
      if (item.id === id) {
        item.qty -= 1;
      }
      return item;
    });

    setCarts(data);

    try {
      const result = await userServices.addToCart({ carts: data });

      if (result.status === 200) {
        console.log("berhasil");
      } else {
        console.log("gagal");
      }
    } catch (error) {
      console.log("gagal");
    }
  };

  const handleDeleteCart = async (id: string) => {
    const newCart = carts.filter((item: any) => {
      return item.id !== id;
    });

    setCarts(newCart);

    try {
      const result = await userServices.addToCart({ carts: newCart });

      if (result.status === 200) {
        console.log("berhasil");
      } else {
        console.log("gagal");
      }
    } catch (error) {
      console.log("gagal");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart();
    }
  }, [session]);

  return (
    <div className="p-2">
      <Button
        type="button"
        className="!w-fit text-2xl px-2 !bg-none mb-4"
        onClick={() => back()}
      >
        <IoArrowBackCircleOutline />
      </Button>
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <div className="flex gap-4 p-3 border shadow rounded">
            <div className="">
              <Skeleton width={75} height={75} />
            </div>
            <div className="w-full">
              <Skeleton className="mb-3 " />
              <div className="w-1/2">
                <Skeleton />
              </div>
            </div>
          </div>
        ) : (
          carts.map((cart: any) => (
            <div
              key={cart.id}
              className="flex gap-3 p-3 border rounded shadow-sm cursor-pointer"
            >
              <Link href={`/products/${cart.id}`}>
                {getProduct(cart.id)?.image && (
                  <Image
                    width={100}
                    height={100}
                    src={`${getProduct(cart.id)?.image}`}
                    alt={cart.id}
                    className="rounded object-cover object-center"
                  />
                )}
              </Link>

              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <h1>{getProduct(cart.id)?.title}</h1>
                  <h3>{convertIDR(`${getProduct(cart.id)?.price}`)}</h3>
                  <div className="flex gap-2 border-2 justify-between w-20 p-1 rounded text-slate-600 mt-1">
                    <button
                      className="text-xs"
                      onClick={() => handleMinusCart(cart.id)}
                      disabled={cart.qty <= 1}
                    >
                      <FaMinus />
                    </button>
                    <h1 className="text-xs">{cart.qty}</h1>
                    <button
                      className="text-xs"
                      onClick={() => handlePlusCart(cart.id)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteCart(cart.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="fixed bottom-0 left-0 bg-gray-100 w-full px-3 py-4 flex items-center justify-between">
        {isLoading ? (
          <div className="flex justify-between w-full">
            <Skeleton width={100} />
            <Skeleton width={75} />
          </div>
        ) : (
          <>
            <h1 className="font-bold text-slate-700">
              Total : {convertIDR(getTotalPrice())}
            </h1>
            <button
              className="bg-slate-800 text-white rounded py-1 px-2"
              onClick={() => push("/checkout")}
            >
              Bayar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartView;
