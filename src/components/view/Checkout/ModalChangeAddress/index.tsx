import Modal from "@/components/contrainer/Modal";
import FormInput from "@/components/UI/FormInput";
import userServices from "@/services/user";
import { FormEvent, useState } from "react";
import { CiCirclePlus, CiEdit } from "react-icons/ci";
import { FiTrash2 } from "react-icons/fi";

const ModalChangeAddress = (props: any) => {
  const {
    profile,
    setProfile,
    selectAddress,
    setSelectAddress,
    setChangeAddress,
  } = props;

  const [addAddress, setAddAddress] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<any>(false);
  const [updateAddress, setUpdateAddress] = useState<any>({});
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
            isMain: true,
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

  const handleDeleteAddress = async (id: number) => {
    const address = profile.address;
    address.splice(id, 1);

    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        console.log("berhasil hapus");
        setProfile({
          address: data.address,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const address = profile.address;
    address[updateAddress.id] = {
      recipient: form.recipient.value,
      phone: form.phone.value,
      addressLine: form.addressLine.value,
      isMain: address[updateAddress.id].isMain,
    };

    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);

      if (result.status) {
        form.reset();
        setProfile({
          address: data.address,
        });
        setIsUpdate(false);
        setIsLoading(false);
        console.log("berhasil update ");
      }
    } catch (error) {
      setIsLoading(false);

      setIsUpdate(false);
      console.log(error);
    }
  };

  const handleChangeMainAddress = async (id: number) => {
    setSelectAddress(id);
    const address = profile.address;
    address.forEach((item: { isMain: boolean }, index: number) => {
      if (index === id) {
        item.isMain = true;
      } else {
        item.isMain = false;
      }
    });

    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);
      if (result.status) {
        setChangeAddress(false);
        console.log("berhasil");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <div
        className={`${
          addAddress || isUpdate ? "hidden" : "flex flex-col gap-2"
        }`}
      >
        <button
          type="button"
          className="rounded w-full border text-slate-700 flex items-center text-sm p-2 gap-2 border-dashed"
          onClick={() => setAddAddress(true)}
        >
          <CiCirclePlus />
          Tambah Alamat
        </button>
        {profile?.address
          ? profile?.address?.map((item: any, index: number) => (
              <div
                key={index}
                className={`border rounded relative p-2 ${
                  selectAddress === index ? "border-2 border-slate-700" : null
                }`}
                onClick={() => {
                  selectAddress !== index
                    ? handleChangeMainAddress(index)
                    : null;
                }}
              >
                <h1 className="text-sm">{item.recipient}</h1>
                <h1 className="text-xs">{item.addressLine}</h1>
                <h1 className="text-xs">{item.phone}</h1>
                <div className="absolute right-2 top-2 flex flex-col gap-2">
                  <button
                    className="bg-blue-500 text-white p-1 rounded shadow z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUpdateAddress({ id: index, ...item });
                      setIsUpdate(true);
                    }}
                  >
                    <CiEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white p-1 rounded shadow"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(index);
                    }}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>

      <form
        className={`${addAddress || isUpdate ? null : "hidden"}`}
        onSubmit={addAddress ? handleAddAddress : handleUpdateAddress}
      >
        <FormInput
          type="text"
          id="recipient"
          title="Penerima"
          defaultValue={isUpdate ? updateAddress.recipient : null}
        />
        <FormInput
          type="text"
          id="phone"
          title="No Hp"
          defaultValue={isUpdate ? updateAddress.phone : null}
        />
        <FormInput
          type="text"
          id="addressLine"
          title="Alamat"
          defaultValue={isUpdate ? updateAddress.addressLine : null}
        />
        <div className="flex gap-2 mt-4 text-sm">
          <button
            className="w-1/2 text-white bg-red-500 rounded shadow py-1.5"
            type="button"
            disabled={isLoading}
            onClick={() => {
              setAddAddress(false);
              setIsUpdate(false);
            }}
          >
            Kembali
          </button>
          <button
            className="w-1/2 text-white bg-slate-800 rounded shadow py-1.5"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : addAddress ? "Tambahkan" : "Perbarui"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalChangeAddress;
