import ActionButton from "@/components/contrainer/ActionButton";
import { useEffect, useState } from "react";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalUpdateUser from "./ModalUpdateUser";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const AdminUserView = (props: any) => {
  const { users } = props;

  const { back } = useRouter();

  const [updateUser, setUpdateUser] = useState({});
  const [deleteUser, setDeleteUser] = useState({});
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setUserData(users);
  }, [users]);

  return (
    <>
      <div className="p-2">
        <div>
          <button
            className="p-2 text-2xl bg-slate-800 rounded text-white shadow font-semibold mb-2"
            onClick={() => back()}
          >
            <IoArrowBackCircleOutline />
          </button>
        </div>
        <div>User Management</div>
        <table className="w-full border-collapse border border-slate-800">
          <thead>
            <tr className="odd:bg-white even:bg-slate-50">
              <th className="border border-slate-800 p-1 ">Nama</th>
              <th className="border border-slate-800 p-1 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user: any) => (
              <tr key={user.id} className="odd:bg-white even:bg-slate-50">
                <td className="border border-slate-800 p-1">
                  {user.fullname}
                  {user.role === "admin" && (
                    <span className="bg-blue-300 rounded-full px-2 text-xs py-0.5 text-blue-800 font-semibold ml-2">
                      Admin
                    </span>
                  )}
                </td>
                <td className="border border-slate-800 py-2 flex justify-center items-center ">
                  <ActionButton>
                    <button
                      className="px-3 py-1 text-blue-500"
                      onClick={() => setUpdateUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-red-500"
                      onClick={() => setDeleteUser(user)}
                    >
                      Hapus
                    </button>
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {Object.keys(updateUser).length > 0 ? (
        <ModalUpdateUser
          updateUser={updateUser}
          setUpdateUser={setUpdateUser}
          setUserData={setUserData}
        />
      ) : null}
      {Object.keys(deleteUser).length > 0 ? (
        <ModalDeleteUser
          deleteUser={deleteUser}
          setDeleteUser={setDeleteUser}
          setUserData={setUserData}
        />
      ) : null}
    </>
  );
};

export default AdminUserView;
