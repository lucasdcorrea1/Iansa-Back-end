import HTTPStatus from "http-status";

export const okResponse = (res, message, records) => {
  if (records) {
    return res.status(HTTPStatus.OK).send({
      result: "OK",
      message,
      records: [records]
    });
  }
  return res.status(HTTPStatus.OK).send({
    result: "OK",
    message
  });
};

export const badRequestResponse = (res, message) =>
  res.status(HTTPStatus.BAD_REQUEST).send({
    result: "BAD_REQUEST",
    message
  });

export const errorResponse = (res, message) =>
  res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({
    result: "INTERNAL_SERVER_ERROR",
    message
  });
