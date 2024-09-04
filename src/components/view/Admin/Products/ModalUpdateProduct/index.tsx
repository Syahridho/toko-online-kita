import Modal from "@/components/contrainer/Modal";
import Button from "@/components/UI/Button";
import FormFile from "@/components/UI/FormFile";
import FormInput from "@/components/UI/FormInput";
import FormTextArea from "@/components/UI/FormTextArea";
import { uploadFile } from "@/lib/firebase/services";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type Proptypes = {
  setUpdateProduct: Dispatch<SetStateAction<any>>;
  updateProduct: Product | any;
  setProductData: Dispatch<SetStateAction<Product[]>>;
};

const ModalUpdateProduct = (props: Proptypes) => {
  const { updateProduct, setUpdateProduct, setProductData } = props;

  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateProducts = async (
    form: any,
    newImageURL: string = updateProduct.image
  ) => {
    setIsLoading(true);
    const data = {
      title: form.title.value,
      price: form.price.value,
      description: form.description.value,
      image: newImageURL,
    };

    const result = await productServices.updateProduct(updateProduct.id, data);

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      setUpdateProduct({});
      const { data } = await productServices.getAllProducts();
      setProductData(data.data);
    } else {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form: any = event.target as HTMLFormElement;
    const file = form.image.files[0];

    if (file) {
      const newName = "main." + file.name.split(".")[1];
      await uploadFile(
        updateProduct.id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            setIsLoading(false);
            updateProducts(form, newImageURL);
          } else {
            setIsLoading(false);
          }
        }
      );
    } else {
      updateProducts(form);
    }
  };

  return (
    <Modal onClose={() => setUpdateProduct({})}>
      <h1 className="font-semibold text-xl text-slate-700 mb-6">
        Perbarui Produk
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Image
          width={100}
          height={100}
          src={
            uploadedImage
              ? URL.createObjectURL(uploadedImage)
              : updateProduct.image
          }
          alt="image"
        />
        <FormFile
          type="file"
          id="image"
          title="Gambar Produk"
          uploadedImage={uploadedImage}
          setUploadImage={setUploadedImage}
        />
        <FormInput
          type="text"
          id="title"
          title="Nama"
          defaultValue={updateProduct.title}
        />
        <FormInput
          type="number"
          id="price"
          title="Harga"
          defaultValue={updateProduct.price}
        />
        <FormTextArea
          id="description"
          title="Deskripsi"
          defaultValue={updateProduct.description}
        />
        <Button type="submit">{isLoading ? "Loading..." : "Perbarui"}</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
