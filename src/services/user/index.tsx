import instance from "@/lib/axios/instance";

const endPoint = {
  user: "/api/user",
};

const userServices = {
  getAllUser: () => instance.get(endPoint.user),
  updateUser: (id: string, data: any) =>
    instance.put(`${endPoint.user}/${id}`, { data }),
  deleteUser: (id: string) => instance.delete(`${endPoint.user}/${id}`),
};

export default userServices;
