const handleClientError = (error) => {
  let errors = [];
  let message = error.message;
  const statusCode = 400;

  switch (error.code) {
    case "P2025":
      message = error.meta?.cause || "Record not found!";
      errors = [
        {
          path: "",
          message,
        },
      ];
      break;
    case "P2003":
      message = "Delete failed";
      errors = [
        {
          path: "",
          message,
        },
      ];
      break;
    case "P2002":
      message = `${error.meta?.target?.split("_")[1]} already in used`;
      errors = [
        {
          path: "",
          message,
        },
      ];
      break;
  }

  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};

export default handleClientError;
