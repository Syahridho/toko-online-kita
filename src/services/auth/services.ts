import { addData, retrieveDataByField } from "@/lib/firebase/services";
import bcrypt from "bcrypt";

export async function signUp(
  userData: {
    fullname: string;
    email: string;
    password: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
    image?: string;
  },
  callback: Function
) {
  const data = await retrieveDataByField("users", "email", userData.email);

  if (data.length > 0) {
    callback(false);
  } else {
    if (!userData.role) {
      userData.role = "member";
    }

    userData.image = "";
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();

    addData("users", userData, (result: boolean) => {
      callback(result);
    });
  }
}

export async function signIn(email: string) {
  const data = await retrieveDataByField("users", "email", email);
  if (data) {
    return data[0];
  } else {
    return null;
  }
}
