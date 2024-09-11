import Modal from "@/components/contrainer/Modal";
import Button from "@/components/UI/Button";
import FormInput from "@/components/UI/FormInput";
import userServices from "@/services/user";
import { FormEvent, useState } from "react";

const ModalChangePassword = (props: any) => {
  const { profile, setProfile, setChangePassword } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const handleChangePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError("");
    const form = event.target as HTMLFormElement;
    const data = {
      password: form.password.value,
      oldPassword: form.oldPassword.value,
      encryptedPassword: profile.password,
    };

    try {
      const result = await userServices.updateProfile(data);
      if (result.status == 200) {
        form.reset();
        console.log("berhasil");
        setIsLoading(false);
        setIsError("");
        setChangePassword(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError("Password Salah");
    }
  };

  return (
    <Modal onClose={() => setChangePassword(false)}>
      <h1 className="text-center text-xl">Ganti Password</h1>
      <form onSubmit={handleChangePassword}>
        <FormInput type="text" id="oldPassword" title="Password Lama" />
        <FormInput type="text" id="password" title="Password Baru" />
        {isError.length > 0 && <h1 className="text-red-500">{isError}</h1>}
        <div className="flex gap-4 mt-8">
          <Button
            type="button"
            className="!bg-red-600"
            onClick={() => setChangePassword(false)}
          >
            Batalkan
          </Button>
          <Button type="submit">{isLoading ? "Loading..." : "Ganti"}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalChangePassword;
