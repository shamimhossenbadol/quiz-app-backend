import httpStatus from "http-status";
import { competitionServices } from "../services/competition.services.js";
import catchAsync from "../utils/catchAsync.js";

const createCompetition = catchAsync(async (req, res, next) => {
  const response = await competitionServices.createCompetition(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Competition created successfully.",
    data: response,
  });
});

const getAllCompetitions = catchAsync(async (req, res, next) => {
  const response = await competitionServices.getAllCompetitions();

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Competition created successfully.",
    data: response,
  });
});

export const competitionControllers = { createCompetition, getAllCompetitions };
