import Modal from "@/components/contrainer/Modal";
import Button from "@/components/UI/Button";
import FormInput from "@/components/UI/FormInput";
import userServices from "@/services/user";
import { FormEvent, useState } from "react";

const ModalChangeProfile = (props: any) => {
  const { profile, setProfile, setChangeProfile } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const handleChangeProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };

    const result = await userServices.updateProfile(data);

    if (result.status === 200) {
      setProfile({
        ...profile,
        fullname: data.fullname,
        phone: data.phone,
      });
      form.reset();
      setIsLoading(false);
      setChangeProfile(false);
    } else {
      setIsLoading(false);
      setIsError("Gagal");
      setChangeProfile(false);
    }
  };

  return (
    <Modal onClose={() => setChangeProfile(false)}>
      <h1 className="text-center text-xl">Ganti Profile</h1>
      <form onSubmit={handleChangeProfile}>
        <FormInput
          type="text"
          id="fullname"
          title="Nama"
          defaultValue={profile.fullname}
        />
        <FormInput
          type="email"
          id="email"
          title="Email"
          defaultValue={profile.email}
          disabled
        />
        <FormInput
          type="text"
          id="phone"
          title="Phone"
          defaultValue={profile.phone}
        />
        {isError.length > 0 && <h1 className="text-red-500">{isError}</h1>}
        <div className="flex gap-4 mt-8">
          <Button
            type="button"
            className="!bg-red-600"
            onClick={() => setChangeProfile({})}
          >
            Batalkan
          </Button>
          <Button type="submit">{isLoading ? "Loading..." : "Ganti"}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalChangeProfile;
