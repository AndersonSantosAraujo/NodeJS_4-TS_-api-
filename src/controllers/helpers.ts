import { HttpsStatusCode } from "./protocols";

export const ok = (body: any) => {
  return {
    statusCode: HttpsStatusCode.OK,
    body,
  };
};

export const created = (body: any) => {
  return {
    statusCode: HttpsStatusCode.CREATED,
    body,
  };
};

export const badRequest = (message: string) => {
  return {
    statusCode: HttpsStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const serverError = () => {
  return {
    statusCode: HttpsStatusCode.SERVER_ERROR,
    body: "Something went wrong.",
  };
};
