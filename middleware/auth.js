import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { userServices } from "../services/user.services.js";
import ApiError from "../errors/apiError.js";
import environment from "../config/environment.js";

const auth =
  (...allowdRoles) =>
  async (req, res, next) => {
    try {
      const barerToken = req.headers.authorization;
      if (!barerToken)
        throw new ApiError(httpStatus.UNAUTHORIZED, "No token provided");

      const token = barerToken.split(" ")[1];

      console.log(token);
      const verifiedUser = jwt.verify(token, environment.jwt_secret);
      if (!verifiedUser)
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");

      const user = await userServices.getUserById(verifiedUser.id);
      if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      req.user = user;

      if (!allowdRoles.includes(user.role))
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
