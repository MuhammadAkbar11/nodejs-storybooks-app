exports.get404 = (req, res) => {
  return res.status(404).render("errors/404", {
    title: "Page Not Found",
    path: "/404",
    layout: "error",
  });
};

exports.get500 = (error, req, res, next) => {
  const isErrDataEmpty = obj => {
    return Object.keys(obj).length === 0;
  };

  const errData = {
    status: false,
    statusCode: error.statusCode,
    message: error.message,
    data: error.data,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
    ...error.errors,
  };

  if (error?.data) {
    if (isErrDataEmpty(error.data)) {
      delete errData.data;
    }
  }

  const renderView = error.statusCode === 404 ? "errors/404" : 500;

  return res.status(error.statusCode).render(renderView, {
    pageTitle: "Something Error",
    path: "/500",
    layout: "error",
    ...errData,
  });
};
