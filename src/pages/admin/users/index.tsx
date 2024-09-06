import { useEffect, useState } from "react";
import AdminUserView from "../../../components/view/Admin/Users";
import userServices from "@/services/user";

const AdminUserPages = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUser();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);

  return <AdminUserView users={users} />;
};

export default AdminUserPages;
