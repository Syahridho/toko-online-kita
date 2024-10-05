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
  const [isLoading, setIsLoading] = useState({
    profile: true,
    allProducts: true,
  });

  const getProfile = async () => {
    try {
      const { data } = await userServices.getProfile();
      setProfile(data.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, profile: false }));
    }
  };

  const getProduct = (id: string) => {
    const product: any = products.find((product: any) => product.id === id);
    return product;
  };

  const getAllProduct = async () => {
    try {
      const { data } = await productServices.getAllProducts();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading((prev) => ({ ...prev, allProducts: false }));
    }
  };

  const getOrders = () => {
    if (isLoading.profile || isLoading.allProducts) return;
    if (!profile?.transaction) return;

    const orders = profile.transaction.reduce((acc: any, transaction: any) => {
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

  console.log(orders);

  useEffect(() => {
    if (status === "authenticated") {
      getProfile();
    }
  }, [status]);

  useEffect(() => {
    if (profile?.transaction) {
      getAllProduct();
    }
  }, [profile]);

  useEffect(() => {
    getOrders();
  }, [isLoading, profile, products]);

  return (
    <div className="p-4 flex flex-col gap-2">
      {isLoading.profile || isLoading.allProducts ? (
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
      )}
    </div>
  );
};

export default OrderView;
