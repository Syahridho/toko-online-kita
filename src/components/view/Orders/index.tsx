import productServices from "@/services/product";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const OrderView = () => {
  const { data, status }: any = useSession();

  const [profile, setProfile] = useState<any>({});
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
  };

  const getProduct = (id: string) => {
    const product: any = products.find((product: any) => product.id === id);
    return product;
  };

  const getAllProduct = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);

    const transactionData = profile.transaction;

    if (!transactionData) {
      return;
    }

    const orders = transactionData.reduce((acc: any, transaction: any) => {
      transaction.items.forEach((item: { id: string; qty: number }) => {
        const product = getProduct(item.id);
        if (product) {
          acc.push({
            product,
            qty: item.qty,
            status: transaction.status,
          });
        }
      });
      return acc;
    }, []);
    setOrders(orders);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getProfile();
      getAllProduct();
    }
  }, []);

  return (
    <div className="p-4">
      {profile ? (
        orders?.map((item: any, index: number) => (
          <div key={index} className="w-full border rounded p-2 flex gap-2">
            <Image
              src={item.product.image}
              alt={item.product.title}
              width={100}
              height={100}
              className="rounded"
            />
            <div>
              <h1>{item.product.title}</h1>
              <p>Bungkus : {item.qty}</p>
              <p className="text-xs bg-yellow-200 text-yellow-600 rounded-full py-1 px-2 inline-block">
                {item.status}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full border rounded p-2 flex gap-2">
          <div>
            <Skeleton width={50} height={50} />
          </div>
          <div className="w-full">
            <Skeleton className="mb-3 " />
            <div className="w-1/3">
              <Skeleton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderView;
