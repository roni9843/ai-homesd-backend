const error = (error, _req, res, _next) => {
  console.log(error);

  const { status, message } = error;

  res.status(!status ? 500 : status).json({
    message: !message ? "server error" : message,
  });
};

module.exports = error;
