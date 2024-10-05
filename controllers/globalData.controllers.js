import httpStatus from "http-status";
import { globalDataServices } from "../services/globalData.services.js";
import catchAsync from "../utils/catchAsync.js";

const createGlobalData = catchAsync(async (req, res, next) => {
  const response = await globalDataServices.createGlobalData(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Global data created successfully",
    data: response,
  });
});

const getGlobalData = catchAsync(async (req, res, next) => {
  const response = await globalDataServices.getGlobalData();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Global data fetched successfully",
    data: response,
  });
});

const updateGlobalData = catchAsync(async (req, res, next) => {
  const response = await globalDataServices.updateGlobalData(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Global data updated successfully",
    data: response,
  });
});

export const globalDataControllers = {
  createGlobalData,
  getGlobalData,
  updateGlobalData,
};
