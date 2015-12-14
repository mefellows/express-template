export default (metricsHandler, errorHandler) => request => {
  const startTime = Date.now();
  const callback = request.callback;

  request.callback = (error, response) => {
    try {
      metricsHandler({
        duration: Date.now() - startTime,
        error,
        response,
        request,
      });
    } catch (err) {
      errorHandler(err);
    }

    callback.call(request, error, response);
  };

  return request;
};
