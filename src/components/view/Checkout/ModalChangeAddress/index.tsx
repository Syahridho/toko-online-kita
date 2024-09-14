import Modal from "@/components/contrainer/Modal";
import FormInput from "@/components/UI/FormInput";
import userServices from "@/services/user";
import { FormEvent, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";

const ModalChangeAddress = (props: any) => {
  const { profile, setProfile, setChangeAddress } = props;

  const [addAddress, setAddAddress] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    let data: any;

    if (profile?.address?.length > 0) {
      data = {
        address: [
          ...profile.address,
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            isMain: false,
          },
        ],
      };
    } else {
      data = {
        address: [
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            isMain: false,
          },
        ],
      };
    }

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        form.reset();
        setAddAddress(false);
        setProfile({
          ...profile.address,
          address: data.address,
        });
        setIsLoading(false);
        console.log(profile);
        console.log("berhasil");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <div className={`${addAddress ? "hidden" : "flex flex-col"}`}>
        <button
          type="button"
          className="rounded w-full border text-slate-700 flex items-center text-sm p-2 gap-2 border-dashed"
          onClick={() => setAddAddress(true)}
        >
          <CiCirclePlus />
          Tambah Alamat
        </button>
        {profile?.address?.map((item: any, index: number) => (
          <div key={index}>
            <h1>{item.recipient}</h1>
            <h1>{item.addressLine}</h1>
            <h1>{item.phone}</h1>
          </div>
        ))}
      </div>

      <form
        className={`${!addAddress && "hidden"}`}
        onSubmit={handleAddAddress}
      >
        <FormInput type="text" id="recipient" title="Penerima" />
        <FormInput type="text" id="phone" title="No Hp" />
        <FormInput type="text" id="addressLine" title="Alamat" />
        <div className="flex gap-2 mt-4 text-sm">
          <button
            className="w-1/2 text-white bg-red-500 rounded shadow py-1.5"
            type="button"
            onClick={() => setAddAddress(false)}
          >
            Kembali
          </button>
          <button
            className="w-1/2 text-white bg-slate-800 rounded shadow py-1.5"
            type="submit"
          >
            {isLoading ? "Loading..." : "Tambahkan"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalChangeAddress;
