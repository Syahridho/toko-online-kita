import Navbar from "@/components/contrainer/Navbar";
import userServices from "@/services/user";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalChangePicture from "./ModalChangePicture";
import ModalChangeProfile from "./ModalChangeProfile";
import ModalChangePassword from "./ModalChangePassword";

const ProfileView = () => {
  const { data, status }: any = useSession();

  const [profile, setProfile] = useState<any>({});
  const [changeImage, setChangeImage] = useState<any>(false);
  const [changeProfile, setChangeProfile] = useState<any>(false);
  const [changePassword, setChangePassword] = useState<any>(false);

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
  };

  useEffect(() => {
    if (status === "authenticated") {
      try {
        getProfile();
      } catch (error) {
        console.log(error);
      }
    }
  }, [status]);

  return (
    <>
      <div>
        <div>hi profile</div>
      </div>
      <div className="flex flex-col justify-center items-center">
        {profile?.image ? (
          <Image
            width={100}
            height={100}
            src={profile.image}
            alt={profile.id}
            className="rounded-full shadow"
          />
        ) : (
          <div className="bg-gray-400 rounded-full py-6 px-8 text-2xl font-medium">
            {profile?.fullname?.charAt(0)}
          </div>
        )}
        {profile?.fullname && <h1>{profile.fullname}</h1>}

        <button
          className="text-xs text-center mt-4 bg-green-200 px-2 py-1 rounded-full text-green-600 shadow-sm"
          onClick={() => setChangeImage(true)}
        >
          Ubah foto profile
        </button>
      </div>

      <button
        className="w-full p-2 shadow text-left mt-12   text-slate-800"
        onClick={() => setChangeProfile(true)}
      >
        Ganti Profile
      </button>
      {profile.type !== "google" && (
        <button
          className="w-full p-2 shadow text-left  text-slate-800"
          onClick={() => setChangePassword(true)}
        >
          Ganti Password
        </button>
      )}

      <div className="flex flex-col gap-2 ">
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
      {data ? (
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
      {changeImage ? (
        <ModalChangePicture
          profile={profile}
          setProfile={setProfile}
          setChangeImage={setChangeImage}
        />
      ) : null}
      {changeProfile ? (
        <ModalChangeProfile
          profile={profile}
          setProfile={setProfile}
          setChangeProfile={setChangeProfile}
        />
      ) : null}
      {changePassword ? (
        <ModalChangePassword
          profile={profile}
          setProfile={setProfile}
          setChangePassword={setChangePassword}
        />
      ) : null}
    </>
  );
};

export default ProfileView;
