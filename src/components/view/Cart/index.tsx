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

const CartView = () => {
  const session: any = useSession();
  const { back } = useRouter();

  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState<any>([]);

  const getCart = async () => {
    const { data } = await userServices.getCart();
    setCarts(data.data);
  };

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
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
        {carts.map((cart: any) => (
          <Link href={`/products/${cart.id}`} key={cart.id}>
            <div className="flex gap-3 p-3 border rounded shadow-sm cursor-pointer">
              {getProduct(cart.id)?.image && (
                <Image
                  width={100}
                  height={100}
                  src={`${getProduct(cart.id)?.image}`}
                  alt={cart.id}
                  className="rounded"
                />
              )}
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <h1>{getProduct(cart.id)?.title}</h1>
                  <h3>{convertIDR(`${getProduct(cart.id)?.price}`)}</h3>
                  <h1>Jumlah : {cart.qty}</h1>
                  <div className="flex gap-2 border-2 justify-between w-16 p-1 rounded text-slate-600">
                    <button className="text-xs">
                      <FaMinus />
                    </button>
                    <button className="text-xs">
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <div>
                  <button className="text-red-500">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 bg-slate-100 w-full px-3 py-4 flex items-center justify-between">
        <h1 className="font-bold text-slate-700">
          Total : {convertIDR(getTotalPrice())}
        </h1>
        <button className="bg-slate-800 text-white rounded py-1 px-2">
          Bayar
        </button>
      </div>
    </div>
  );
};

export default CartView;
