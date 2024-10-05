import httpStatus from "http-status";
import ApiError from "../errors/apiError.js";
import { userServices } from "../services/user.services.js";
import catchAsync from "../utils/catchAsync.js";
import pick from "../utils/pick.js";

const getUserById = catchAsync(async (req, res, next) => {
  const response = await userServices.getUserById(req.params.id);
  if (!response) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

  res.status(httpStatus.OK).json({
    success: true,
    message: "User fetched successfully",
    data: { user: response },
  });
});

const getPaginatedUsers = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, ["search"]);
  const options = pick(req.query, ["sortBy", "sortOrder", "limit", "page"]);

  const response = await userServices.getPaginatedUsers(filters, options);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Users fetched successfully",
    data: response,
  });
});

const updateUserById = catchAsync(async (req, res, next) => {
  if (req.user.role !== "ADMIN" && req.params.id !== req.user.id)
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to delete this user",
    );
  const response = await userServices.updateUserById(req.params.id, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User updated successfully",
  });
});

const deleteUserById = catchAsync(async (req, res, next) => {
  if (req.user.role !== "ADMIN" && req.params.id !== req.user.id)
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to delete this user",
    );

  const response = await userServices.deleteUserById(req.params.id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User deleted successfully",
    data: response,
  });
});

export const userControllers = {
  getUserById,
  getPaginatedUsers,
  updateUserById,
  deleteUserById,
};
