import Navbar from "@/components/contrainer/Navbar";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ProfilePages = () => {
  const { data }: any = useSession();
  console.log(data);
  return (
    <>
      <div>
        <div>hi profile</div>
      </div>
      <div className="flex flex-col gap-2 mt-12">
        {data?.user?.role === "admin" && (
          <>
            <Link
              href={"/admin/products"}
              className="w-full text-slate-800 p-2 shadow"
            >
              Produk
            </Link>
            <Link
              href={"/admin/users"}
              className="w-full text-slate-800 p-2 shadow"
            >
              User
            </Link>
          </>
        )}
      </div>
      <Navbar />
    </>
  );
};

export default ProfilePages;
