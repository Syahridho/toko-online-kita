import { useEffect, useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import productServices from "@/services/product";
import userServices from "@/services/user";
import convertIDR from "@/utils/currency";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Button from "@/components/UI/Button";

const CheckOutView = () => {
  const session: any = useSession();
  const { back } = useRouter();

  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCarts = async () => {
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

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session?.data?.accessToken) {
      getCarts();
    }
  }, [session]);

  return (
    <div className="p-3">
      <div>
        <Button
          type="button"
          className="!w-fit text-2xl px-2 !bg-none mb-4"
          onClick={() => back()}
        >
          <IoArrowBackCircleOutline />
        </Button>
      </div>
      <div>
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
              className="flex gap-3 p-3 border rounded shadow-sm"
            >
              {getProduct(cart.id)?.image && (
                <Image
                  width={100}
                  height={100}
                  src={`${getProduct(cart.id)?.image}`}
                  alt={cart.id}
                  className="rounded object-cover object-center"
                />
              )}
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <h1>{getProduct(cart.id)?.title}</h1>
                  <h3>{convertIDR(`${getProduct(cart.id)?.price}`)}</h3>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CheckOutView;
