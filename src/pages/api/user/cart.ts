import { retrieveDataById, updateData } from "@/lib/firebase/services";
import {
  responseApiFailed,
  responseApiMethodNotAllowed,
  responseApiNotFound,
  responseApiSuccess,
} from "@/utils/responseAPI";
import { verify } from "@/utils/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(req, res, false, async (decoded: { id: string }) => {
      const user: any = await retrieveDataById("users", decoded.id);
      if (user) {
        user.id = decoded.id;
        if (user.carts) {
          responseApiSuccess(res, user.carts);
        } else {
          responseApiSuccess(res, []);
        }
      } else {
        responseApiNotFound(res);
      }
    });
  } else if (req.method === "PUT") {
    verify(req, res, false, async (decoded: { id: string }) => {
      const { data } = req.body;
      await updateData("users", decoded.id, data, (result: boolean) => {
        if (result) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else {
    responseApiMethodNotAllowed(res);
  }
}
