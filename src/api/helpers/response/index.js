import HttpStatus from 'http-status-codes';

export const buildResponse = (res, status, message, records, isError) => {
  try {
    if (message) {
      const body = {};
      body.statusCode = status;
      if (isError) body.error = HttpStatus.getStatusText(status);
      body.message = message;

      if (records) {
        if (isError) {
          const error = Object.keys(records)[0];
          body[error] = records[error];
          return res.status(status).send(body);
        }
        body.recordCount = records.length ? records.length : 1;
        body.records = [records];
      }
      return res.status(status).send(body);
    }
    return res.status(status).send(records);
  } catch (error) {
    return res.status(status).send(error);
  }
};
