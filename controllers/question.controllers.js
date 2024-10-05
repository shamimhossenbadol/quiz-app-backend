import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import { questionServices } from "../services/question.services.js";

const createQuestion = catchAsync(async (req, res, next) => {
  const response = await questionServices.createQuestion(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Question created successfully",
    data: response,
  });
});

const getQuestionById = catchAsync(async (req, res, next) => {
  const response = await questionServices.getQuestionById(req.params.id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Question fetched successfully",
    data: response,
  });
});

const getAllQuestions = catchAsync(async (req, res, next) => {
  const response = await questionServices.getAllQuestions();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Questions fetched successfully",
    data: response,
  });
});

const updateQuestionById = catchAsync(async (req, res, next) => {
  const response = await questionServices.updateQuestionById(
    req.params.id,
    req.body,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Question updated successfully",
    data: response,
  });
});

const deleteQuestionById = catchAsync(async (req, res, next) => {
  const response = await questionServices.deleteQuestionById(req.params.id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Question deleted successfully",
    data: response,
  });
});

export const questionControllers = {
  createQuestion,
  getQuestionById,
  getAllQuestions,
  updateQuestionById,
  deleteQuestionById,
};
