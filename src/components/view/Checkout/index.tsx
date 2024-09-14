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
import { FaLocationDot, FaAngleRight } from "react-icons/fa6";
import { BiSolidDiscount } from "react-icons/bi";
import { PiNotebookFill } from "react-icons/pi";
import ModalChangeAddress from "./ModalChangeAddress";

const CheckOutView = () => {
  const session: any = useSession();
  const { back } = useRouter();

  const [profile, setProfile] = useState<any>([]);
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectAddress, setSelectAddress] = useState(0);
  const [changeAddress, setChangeAddress] = useState<boolean>(false);
  const [ongkir, setOngkir] = useState(1200);
  const [pajak, setPajak] = useState(1000);

  const getProfile = async () => {
    try {
      const { data } = await userServices.getProfile();
      setProfile(data.data);
      if (data?.data?.address.length > 0) {
        data.data.address.filter((address: { isMain: boolean }, id: number) => {
          if (address.isMain) {
            setSelectAddress(id);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      getProfile();
    }
  }, [session]);

  return (
    <>
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

        <div className="flex flex-col gap-2">
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
                    width={80}
                    height={50}
                    src={`${getProduct(cart.id)?.image}`}
                    alt={cart.id}
                    className="rounded object-cover object-center"
                  />
                )}
                <div className="flex justify-between w-full">
                  <div className="flex flex-col">
                    <h1>{getProduct(cart.id)?.title}</h1>
                    <h2 className="text-sm text-slate-600">
                      {cart.qty} Bungkus
                    </h2>
                    <h3 className="text-sm text-slate-600">
                      {convertIDR(`${getProduct(cart.id)?.price}`)}
                    </h3>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <hr className="my-4" />

        <div className="text-xs text-slate-700 leading-6 border p-2 rounded mb-4">
          <h1 className="!text-slate-950 font-medium">Rincian</h1>
          <h1>Belanja : {convertIDR(getTotalPrice())}</h1>
          <h1>Ongkir : {convertIDR(ongkir)}</h1>
          <h1>Pajak Aplikasi :{convertIDR(pajak)}</h1>
          <hr />
          <h1>Total : {convertIDR(getTotalPrice() + pajak + ongkir)} </h1>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setChangeAddress(true)}
            className="text-left"
          >
            <h1 className="text-sm mb-1 text-slate-700 flex items-center gap-2">
              <FaLocationDot /> Lokasi Penerimaan
            </h1>
            <div className="border rounded p-2 flex gap-2 justify-between items-center cursor-pointer">
              <p className="text-xs text-slate-500 w-full max-w-xs">
                {
                  profile?.address?.find((addr: any) => addr.isMain === true)
                    ?.addressLine
                }
              </p>

              <FaAngleRight className="text-right" />
            </div>
          </button>
          <div>
            <h1 className="text-sm mb-1 text-slate-700 flex items-center gap-2">
              <BiSolidDiscount />
              Promo
            </h1>
            <div className="border rounded p-2 flex gap-2 justify-between items-center cursor-pointer">
              <p className="text-xs text-slate-500 w-full max-w-xs">
                Tidak Ada
              </p>
              <FaAngleRight className="text-right" />
            </div>
          </div>
          <div>
            <h1 className="text-sm mb-1 text-slate-700 flex items-center gap-2">
              <PiNotebookFill />
              Catatan
            </h1>
            <textarea
              name="noted"
              id="noted"
              className="border w-full rounded h-24 p-2"
            />
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-slate-200 px-2 py-1.5 flex justify-between items-center">
          <h1>Total : {convertIDR(getTotalPrice())}</h1>
          <Button type="button" className="!w-fit px-4">
            Bayar
          </Button>
        </div>
      </div>
      {changeAddress ? (
        <ModalChangeAddress
          profile={profile}
          setProfile={setProfile}
          selectAddress={selectAddress}
          setSelectAddress={setSelectAddress}
          setChangeAddress={setChangeAddress}
        />
      ) : null}
    </>
  );
};

export default CheckOutView;
