import type { NextApiRequest, NextApiResponse } from "next";
import {
  responseApiFailed,
  responseApiMethodNotAllowed,
  responseApiSuccess,
} from "@/utils/responseAPI";
import { verify } from "@/utils/verifyToken";
import { addData, updateData } from "@/lib/firebase/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    verify(req, res, true, async () => {
      let data = req.body;
      data.created_at = new Date();
      data.updated_at = new Date();
      data.price = parseInt(data.price);

      await addData("products", data, (status: boolean, result: any) => {
        if (status) {
          responseApiSuccess(res, { id: result.id });
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else if (req.method === "PUT") {
    verify(req, res, true, async () => {
      const { product }: any = req.query;
      const { data } = req.body;
      await updateData("products", product[0], data, (status: boolean) => {
        if (status) {
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
