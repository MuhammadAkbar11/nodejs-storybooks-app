exports.get404 = (req, res) => {
  return res.status(404).render("errors/404", {
    title: "Page Not Found",
    path: "/404",
    layout: "error",
  });
};

exports.get500 = (error, req, res) => {
  const isErrorsEmpty = obj => {
    return Object.keys(obj).length === 0;
  };

  const errData = {
    status: false,
    statusCode: 500,
    message: error.message,
    errors: error.errors,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  };

  if (error?.errors) {
    if (isErrorsEmpty(error.errors)) {
      delete errData.errors;
    }
  }

  return res.status(500).render("errors/500", {
    pageTitle: "Something Error",
    path: "/500",
    layout: "error",
    ...errData,
  });
};
