import Modal from "@/components/contrainer/Modal";
import Button from "@/components/UI/Button";
import FormFile from "@/components/UI/FormFile";
import FormInput from "@/components/UI/FormInput";
import FormTextArea from "@/components/UI/FormTextArea";
import { uploadFile } from "@/lib/firebase/services";
import productServices from "@/services/product";
import Image from "next/image";
import { FormEvent, useState } from "react";

const ModalAddProducts = (props: any) => {
  const { setAddProduct, setProductData } = props;

  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadImage = async (id: string, form: any) => {
    setIsLoading(true);
    const file = form.image.files[0];
    const newName = "main." + file.name.split(".")[1];

    if (file) {
      await uploadFile(
        id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };

            const result = await productServices.updateProduct(id, data);

            if (result.status === 200) {
              form.reset();
              const { data } = await productServices.getAllProducts();
              setProductData(data.data);
              setIsLoading(false);
              setAddProduct(false);
            } else {
              setIsLoading(false);
            }
          } else {
            console.log("Failed Add");
          }
        }
      );
    } else {
      console.log("no file select");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form: any = event.target as HTMLFormElement;
    const data = {
      title: form.title.value,
      price: parseInt(form.price.value),
      description: form.description.value,
      image: "",
    };

    const result = await productServices.addProduct(data);

    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log("gagal");
    }
  };

  return (
    <Modal onClose={() => setAddProduct(false)}>
      <h1 className="font-semibold text-xl text-slate-700 mb-6">
        Tambahkan Produk
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {uploadedImage && (
          <Image
            width={100}
            height={100}
            src={URL.createObjectURL(uploadedImage)}
            alt="image"
          />
        )}
        <FormFile
          id="image"
          title="Gambar Produk"
          setUploadImage={setUploadedImage}
        />
        <FormInput type="text" id="title" title="Nama" />
        <FormInput type="number" id="price" title="Harga" />
        <FormTextArea id="description" title="Deskripsi" />
        <Button type="submit">{isLoading ? "Loading..." : "Tambahkan"}</Button>
      </form>
    </Modal>
  );
};

export default ModalAddProducts;
