import Modal from "@/components/contrainer/Modal";
import Button from "@/components/UI/Button";
import userServices from "@/services/user";
import { useState } from "react";

const ModalDeleteUser = (props: any) => {
  const { setDeleteUser, deleteUser, setUserData } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);

    const result = await userServices.deleteUser(deleteUser.id);

    if (result.status === 200) {
      const { data } = await userServices.getAllUser();
      setUserData(data.data);
      setIsLoading(false);
      setDeleteUser({});
    } else {
      console.log("gagal Delete");
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setDeleteUser({})}>
      <h1 className="font-semibold text-xl text-slate-700 mb-6">Hapus User</h1>
      <h1 className="mt-1">Yakin ingin menghapus Akun?</h1>
      <span className="font-bold text-slate-800">{deleteUser.fullname}</span>
      <Button
        type="submit"
        className="!bg-red-500 hover:!bg-red-700"
        onClick={() => handleDelete()}
      >
        {isLoading ? "Loading..." : "Hapus"}
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
