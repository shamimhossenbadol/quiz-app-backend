import httpStatus from "http-status";
import { quoteServices } from "../services/quote.services.js";
import catchAsync from "../utils/catchAsync.js";

const createQuote = catchAsync(async (req, res, next) => {
  const response = await quoteServices.createQuote(req.body);

  res.status(httpStatus.CREATED).json({
    status: "success",
    message: "Quote created successfully",
    data: response,
  });
});

const getAllQuotes = catchAsync(async (req, res, next) => {
  const response = await quoteServices.getAllQuotes();

  res.status(httpStatus.OK).json({
    status: "success",
    message: "Quotes fetched successfully",
    data: response,
  });
});

const updateQuoteById = catchAsync(async (req, res, next) => {
  const response = await quoteServices.updateQuoteById(req.params.id, req.body);

  res.status(httpStatus.OK).json({
    status: "success",
    message: "Quote updated successfully",
    data: response,
  });
});

const deleteQuoteById = catchAsync(async (req, res, next) => {
  const response = await quoteServices.deleteQuoteById(req.params.id);

  res.status(httpStatus.OK).json({
    status: "success",
    message: "Quote deleted successfully",
    data: response,
  });
});

export const quoteControllers = {
  createQuote,
  getAllQuotes,
  updateQuoteById,
  deleteQuoteById,
};
