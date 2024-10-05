import httpStatus from "http-status";
import { userHistoryServices } from "../services/userHistory.services.js";
import catchAsync from "../utils/catchAsync.js";

const getHistoryByUserId = catchAsync(async (req, res, next) => {
  const response = await userHistoryServices.getHistoryByUserId(req.params.id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "History fetched successfully",
    data: response,
  });
});

const updateHistoryByUserId = catchAsync(async (req, res, next) => {
  const response = await userHistoryServices.updateHisotryByUserId(
    req.params.id,
    req.body,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "History updated successfully",
    data: response,
  });
});

export const userHistoryControllers = {
  getHistoryByUserId,
  updateHistoryByUserId,
};
