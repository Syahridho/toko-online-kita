import Modal from "@/components/contrainer/Modal";
import Button from "@/components/UI/Button";
import FormInput from "@/components/UI/FormInput";
import userServices from "@/services/user";
import { FormEvent, useState } from "react";

const ModalUpdateUser = (props: any) => {
  const { setUpdateUser, updateUser, setUserData } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const role = form.role.value;

    if (!role) {
      console.error("Role is undefined");
      setIsLoading(false);
      return;
    }

    const data = { role };

    try {
      const result = await userServices.updateUser(updateUser.id, data);

      if (result.status === 200) {
        setIsLoading(false);
        setUpdateUser({});
        const { data } = await userServices.getAllUser();
        setUserData(data.data);
      } else {
        console.log("gagal");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Modal onClose={() => setUpdateUser({})}>
      <h1 className="font-semibold text-xl text-slate-700 mb-6">
        Perbarui Role User
      </h1>
      <form onSubmit={handleUpdate}>
        <FormInput
          type="text"
          id="fullname"
          title="Fullname"
          defaultValue={updateUser.fullname}
        />
        <FormInput
          type="email"
          id="email"
          title="Email"
          defaultValue={updateUser.email}
          disabled
        />
        <div className="mt-2 flex flex-col">
          <label htmlFor="role" className="font-semibold">
            Role
          </label>
          <select
            name="role"
            id="role"
            className="border p-1 rounded"
            defaultValue={updateUser.role}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <Button type="submit" className="bg-red-500 hover:!bg-red-700 mt-4">
          {isLoading ? "Loading..." : "Perbarui"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
