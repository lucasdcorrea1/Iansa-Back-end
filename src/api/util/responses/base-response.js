export const buildResponse = (res, status, message, records) => {
  let resultObject = {};
  if (message) {
    resultObject.statusCode = status;
    resultObject.message = message;
    if (records) {
      resultObject.recordCount = records.length ? records.length : 1;
      resultObject.records = [records];
    }
  } else {
    resultObject = records;
  }
  return res.status(status).send(resultObject);
};
