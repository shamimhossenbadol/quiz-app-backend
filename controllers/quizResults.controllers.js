import httpStatus from "http-status";
import { quizResultServices } from "../services/quizResults.services.js";
import catchAsync from "../utils/catchAsync.js";

const addQuizResult = catchAsync(async (req, res, next) => {
  const response = await quizResultServices.addQuizResult(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Quiz result created successfully",
    data: response,
  });
});

const getQuizResultById = catchAsync(async (req, res, next) => {
  const response = await quizResultServices.getQuizResultById(req.params.id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Quiz result fetched successfully",
    data: response,
  });
});

const getAllQuizResults = catchAsync(async (req, res, next) => {
  const response = await quizResultServices.getAllQuizResults();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Quiz results fetched successfully",
    data: response,
  });
});

const updateQuizResultById = catchAsync(async (req, res, next) => {
  const response = await quizResultServices.updateQuizResultById(
    req.params.id,
    req.body,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Quiz result updated successfully",
    data: response,
  });
});

const deleteQuizResultById = catchAsync(async (req, res, next) => {
  const response = await quizResultServices.deleteQuizResultById(req.params.id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Quiz result deleted successfully",
    data: response,
  });
});

export const quizResultControllers = {
  addQuizResult,
  getQuizResultById,
  getAllQuizResults,
  updateQuizResultById,
  deleteQuizResultById,
};
