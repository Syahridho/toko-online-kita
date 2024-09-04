import instance from "@/lib/axios/instance";

const endPoint = "/api/product";

const productServices = {
  addProduct: (data: any) => instance.post(endPoint, data),
  updateProduct: (id: string, data: any) =>
    instance.put(`${endPoint}/${id}`, { data }),
};

export default productServices;
