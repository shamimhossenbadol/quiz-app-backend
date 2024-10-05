import httpStatus from "http-status";
import { userServices } from "../services/user.services.js";
import catchAsync from "../utils/catchAsync.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../errors/apiError.js";
import transporter from "../utils/emailTransporter.js";
import environment from "../config/environment.js";

const signUp = catchAsync(async (req, res, next) => {
  const data = req.body;
  // hash password
  data.password = await bcrypt.hash(data.password, 10);

  await userServices.createUser(data);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "User created successfully",
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userServices.getUserByEmail(email);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");

  const token = jwt.sign({ id: user.id }, environment.jwt_secret, {
    expiresIn: "1d",
  });

  const details = Object.keys(user)
    .filter((objKey) => objKey !== "history")
    .reduce((newObj, key) => {
      newObj[key] = user[key];
      return newObj;
    }, {});

  res.status(httpStatus.OK).json({
    success: true,
    message: "User logged in successfully",
    token: token,
    data: { user: details, history: user.history },
  });
});

const requestOtp = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await userServices.getUserByEmail(email);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpExpiresAt = new Date(Date.now() + 3 * 60 * 1000);

  transporter.sendMail(
    {
      from: environment.email,
      to: user.email,
      subject: "OTP for password reset",
      text: `Your OTP for password reset is ${otp}. This code will expire in 3 minutes.`,
    },
    function(error, info) {
      if (error) {
        console.log(error, info)

        throw new ApiError(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Failed to send OTP at this moment, please try again later.",
        );
      } else {
        console.log("Email sent: " + info.response);
      }
    },
  );

  await userServices.updateUserById(user.id, { otp, otpExpiresAt });

  res.status(httpStatus.OK).json({
    success: true,
    message: "OTP sent successfully",
  });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { email, otp, password } = req.body;
  const user = await userServices.getUserByEmail(email);

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  if (!user.otp === otp)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid OTP");
  if (user.otpExpiresAt < new Date())
    throw new ApiError(httpStatus.NOT_FOUND, "OTP expired");

  const hashedPassword = await bcrypt.hash(password, 10);
  await userServices.updateUserById(user.id, { password: hashedPassword });

  res.status(httpStatus.OK).json({
    success: true,
    message: "Password reset successfully",
  });
});

export const authControllers = { signUp, login, requestOtp, resetPassword };
