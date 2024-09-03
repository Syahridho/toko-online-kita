import { NextApiResponse } from "next";

export const responseAPI = (
  res: NextApiResponse,
  status: boolean,
  statusCode: number,
  message: string,
  data: any = {}
) => {
  res.status(statusCode).json({
    status,
    statusCode,
    message,
    data,
  });
};

export const responseApiSuccess = (res: NextApiResponse, data = {}) => {
  responseAPI(res, true, 200, "success", data);
};

export const responseApiFailed = (res: NextApiResponse, data = {}) => {
  responseAPI(res, false, 400, "failed", data);
};

export const responseApiAccessDenied = (res: NextApiResponse, data = {}) => {
  responseAPI(res, false, 403, "access denied", data);
};

export const responseApiNotFound = (res: NextApiResponse, data = {}) => {
  responseAPI(res, false, 404, "not found", data);
};

export const responseApiMethodNotAllowed = (
  res: NextApiResponse,
  data = {}
) => {
  responseAPI(res, false, 405, "Method Not Allow", data);
};
