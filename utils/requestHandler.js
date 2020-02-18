const requestHandler = {
  success(res, statusCode, message, body) {
    if (body) {
      return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        body
      });
    }
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message
    });
  },
  error(res, statusCode, message, err) {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      err
    });
  }
};

module.exports = requestHandler;
