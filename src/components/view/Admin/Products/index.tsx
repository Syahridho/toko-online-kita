import { useState } from "react";
import ModalAddProducts from "./ModalAddProducts";
import Button from "@/components/UI/Button";

const AdminProductView = () => {
  const [productData, setProductData] = useState([]);

  const [addProduct, setAddProduct] = useState<boolean>(false);
  const [updateProduct, setUpdateProduct] = useState<any>({});
  const [deleteProduct, setDeleteProduct] = useState<any>({});

  return (
    <>
      <div>
        <div>hi</div>
        <Button
          type="button"
          className="w-fit px-4"
          onClick={() => setAddProduct(true)}
        >
          add
        </Button>
      </div>
      {addProduct && (
        <ModalAddProducts
          setAddProduct={setAddProduct}
          setProductData={setProductData}
        />
      )}
    </>
  );
};

export default AdminProductView;
