import Modal from "@/components/contrainer/Modal";
import Button from "@/components/UI/Button";
import FormFile from "@/components/UI/FormFile";
import { uploadFile } from "@/lib/firebase/services";
import userServices from "@/services/user";
import Image from "next/image";
import { FormEvent, useState } from "react";

const ModalChangePicture = (props: any) => {
  const { profile, setProfile, setChangeImage } = props;

  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const handleChangeProfilePicture = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError("");
    const form = event.target as HTMLFormElement;
    const file = form.image.files[0];
    const newName = "profile." + file.name.split(".")[1];

    if (file) {
      uploadFile(
        profile.id,
        file,
        newName,
        "users",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await userServices.updateProfile(data);
            if (result.status === 200) {
              setProfile({ ...profile, image: newImageURL });
              setChangeImage();
              form.reset();
              console.log("berhasil");
              setIsLoading(false);
            } else {
              setIsLoading(false);
              setIsError("Error kontak developer ");
              console.log("gagl");
            }
          } else {
            setIsLoading(false);
            setIsError("Ukuran foto terlalu besar!!");
            console.log("gagal change profile");
          }
        }
      );
    }
  };

  return (
    <Modal onClose={() => setChangeImage(false)}>
      <form onSubmit={handleChangeProfilePicture}>
        <Image
          width={100}
          height={100}
          src={
            uploadedImage ? URL.createObjectURL(uploadedImage) : profile.image
          }
          alt={profile.fullname}
        />
        <FormFile
          id="image"
          title="Ubah Foto Profile"
          uploadedImage={uploadedImage}
          setUploadImage={setUploadedImage}
        />
        {isError.length > 0 && <h1 className="text-red-500">{isError}</h1>}
        <div className="flex gap-4 mt-8">
          <Button
            type="button"
            className="!bg-red-600"
            onClick={() => setChangeImage(false)}
          >
            Batalkan
          </Button>
          <Button type="submit">{isLoading ? "Loading..." : "Ganti"}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalChangePicture;
