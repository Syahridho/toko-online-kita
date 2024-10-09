import Navbar from "@/components/contrainer/Navbar";
import userServices from "@/services/user";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalChangePicture from "./ModalChangePicture";
import ModalChangeProfile from "./ModalChangeProfile";
import ModalChangePassword from "./ModalChangePassword";
import Skeleton from "react-loading-skeleton";

const ProfileView = () => {
  const { data, status }: any = useSession();

  const [profile, setProfile] = useState<any>({});
  const [toggle, setToggle] = useState({
    changeImage: false,
    changeProfile: false,
    changePassword: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProfile = async () => {
    try {
      const { data } = await userServices.getProfile();
      setProfile(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getProfile();
    }
    setIsLoading(false);
  }, [status]);

  return (
    <>
      <div className="flex flex-col justify-center items-center pt-12">
        {isLoading || status === "loading" ? (
          <>
            <Skeleton circle width={100} height={100} />
            <Skeleton width={100} />
            <Skeleton width={100} className="mt-4" />
          </>
        ) : status === "authenticated" && profile ? (
          <>
            {profile.image ? (
              <Image
                width={100}
                height={100}
                src={profile.image}
                alt={profile.id}
                className="rounded-full shadow w-[100px] h-[100px] object-cover object-center"
              />
            ) : (
              <div className="rounded-full shadow w-[100px] h-[100px] flex items-center justify-center bg-slate-100">
                {profile?.fullname?.charAt(0).toUpperCase()}
              </div>
            )}
            <h1>{profile.fullname}</h1>
            <button
              className="text-xs text-center mt-4 bg-green-200 px-2 py-1 rounded-full text-green-600 shadow-sm"
              onClick={() => setToggle({ ...toggle, changeImage: true })}
            >
              Ubah foto profile
            </button>
          </>
        ) : null}
      </div>

      <div className="flex flex-col mt-8">
        {isLoading ? (
          <div className="p-2">
            <Skeleton count={4} height={25} />
          </div>
        ) : status !== "unauthenticated" ? (
          <>
            {profile && (
              <>
                <button
                  className="w-full p-2 shadow text-left text-slate-800"
                  onClick={() => setToggle({ ...toggle, changeProfile: true })}
                >
                  Ganti Profile
                </button>
                {profile?.type !== "google" ? (
                  <button
                    className="w-full p-2 shadow text-left text-slate-800"
                    onClick={() =>
                      setToggle({ ...toggle, changePassword: true })
                    }
                  >
                    Ganti Password
                  </button>
                ) : null}
              </>
            )}

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
                <Link
                  href={"/admin/orders"}
                  className="w-full text-slate-800 p-2 shadow"
                >
                  Orderan
                </Link>
              </>
            )}
          </>
        ) : null}
      </div>
      {isLoading ? (
        <Skeleton width={100} height={35} className="m-2" />
      ) : data ? (
        <button
          className="bg-red-600 text-white px-4 py-2 rounded shadow mt-4"
          onClick={() => signOut()}
        >
          LogOut
        </button>
      ) : (
        <button
          className="bg-slate-800 text-white px-4 py-2 rounded shadow mt-4"
          onClick={() => signIn()}
        >
          SignIn
        </button>
      )}
      <Navbar />
      {toggle.changeImage ? (
        <ModalChangePicture
          profile={profile}
          setProfile={setProfile}
          setChangeImage={() => setToggle({ ...toggle, changeImage: false })}
        />
      ) : null}
      {toggle.changeProfile ? (
        <ModalChangeProfile
          profile={profile}
          setProfile={setProfile}
          setChangeProfile={() =>
            setToggle({ ...toggle, changeProfile: false })
          }
        />
      ) : null}
      {toggle.changePassword ? (
        <ModalChangePassword
          profile={profile}
          setProfile={setProfile}
          setChangePassword={() =>
            setToggle({ ...toggle, changePassword: false })
          }
        />
      ) : null}
    </>
  );
};

export default ProfileView;
