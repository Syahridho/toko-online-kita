import Modal from "@/components/contrainer/Modal";
import Button from "@/components/UI/Button";
import { deleteFile } from "@/lib/firebase/services";
import productServices from "@/services/product";
import Image from "next/image";
import { FormEvent, useState } from "react";

const ModalDeleteProduct = (props: any) => {
  const { setDeleteProduct, deleteProduct, setProductData } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await productServices.deleteProduct(deleteProduct.id);

    if (result.status === 200) {
      setIsLoading(false);
      deleteFile(
        `/images/products/${deleteProduct.id}/${
          deleteProduct.image.split("%2F")[3].split("?")[0]
        }`,
        async (status: boolean) => {
          setDeleteProduct({});
          const { data } = await productServices.getAllProducts();
          setProductData(data.data);
        }
      );
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setDeleteProduct({})}>
      <h1 className="font-semibold text-xl text-slate-700 mb-6">
        Hapus Produk
      </h1>
      {deleteProduct.image && (
        <Image
          width={100}
          height={100}
          src={deleteProduct.image}
          alt="image"
          className="rounded shadow"
        />
      )}
      <h1 className="mt-1">Yakin ingin menghapus?</h1>
      <span className="font-bold text-slate-800">{deleteProduct.title}</span>
      <Button
        type="submit"
        className="bg-red-500 hover:!bg-red-700"
        onClick={() => handleDelete()}
      >
        {isLoading ? "Loading..." : "Hapus"}
      </Button>
    </Modal>
  );
};

export default ModalDeleteProduct;
