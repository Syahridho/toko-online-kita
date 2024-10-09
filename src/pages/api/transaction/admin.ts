import { retrieveData } from "@/lib/firebase/services";
import {
  responseApiAccessDenied,
  responseApiSuccess,
} from "@/utils/responseAPI";
import { verify } from "@/utils/verifyToken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, true, async () => {
      const users = await retrieveData("users");
      let data: any = [];

      users.forEach((user: any) => {
        if (user.transaction) {
          const transaction = user.transaction.map((transaction: any) => {
            return {
              ...transaction,
              user: {
                id: user.id,
                fullname: user.fullname,
              },
            };
          });
          data = [...data, transaction];
        }
      });
      const datas = data.flatMap((innerArray: Array<any>) => innerArray);
      responseApiSuccess(res, datas);
    });
  } else {
    responseApiAccessDenied(res);
  }
}
