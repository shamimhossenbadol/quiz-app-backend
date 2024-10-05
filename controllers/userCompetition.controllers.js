import httpStatus from "http-status";
import { userCompetitionServices } from "../services/userCompition.services.js";
import catchAsync from "../utils/catchAsync.js";
import pick from "../utils/pick.js";

const postCompetitionData = catchAsync(async (req, res, next) => {
  await userCompetitionServices.addUserCompetition(
    req.body,
    req.query.competition !== "false",
  );

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Competition created successfully",
  });
});

const getCompetitionDataWithPosition = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, ["search"]);
  const options = pick(req.query, ["sortBy", "sortOrder", "limit", "page"]);
  const { quiz_id, user_id } = req.query;
  console.log(options);

  const response = await userCompetitionServices.getCompetitionDataWithPosition(
    filters,
    options,
    quiz_id,
    user_id,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: "Competitions fetched successfully",
    data: response,
  });
});

export const userCompetitionControllers = {
  postCompetitionData,
  getCompetitionDataWithPosition,
};
