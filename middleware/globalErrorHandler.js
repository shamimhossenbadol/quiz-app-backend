import status from "http-status";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import handleZodError from "./handleZodError.js";
import ApiError from "../errors/apiError.js";
import handleClientError from "./handleClientError.js";

const globalErrorHandler = (error, req, res, next) => {
  console.log("Global error handler: ", error);

  let statusCode = status.INTERNAL_SERVER_ERROR;
  let message = error?.message || "Something went wrong";
  let errors = [];

  //   if (error instanceof Prisma.PrismaClientValidationError) {
  //     const simplifiedError = handleValidationError(error);
  //     statusCode = simplifiedError.statusCode;
  //     message = simplifiedError.message;
  //     errorMessages = simplifiedError.errorMessages;
  //   } else if (error instanceof ZodError) {
  //     const simplifiedError = handleZodError(error);
  //     statusCode = simplifiedError.statusCode;
  //     message = simplifiedError.message;
  //     errorMessages = simplifiedError.errorMessages;

  if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleClientError(error);
    console.log(simplifiedError);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } else if (error instanceof ZodError) {
    const parsedError = handleZodError(error);
    statusCode = parsedError.statusCode;
    message = parsedError.message;
    errors = parsedError.errorMessages;
  } else if (error instanceof Error) {
    message = error?.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
  next();
};

export default globalErrorHandler;
