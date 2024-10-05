import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  jwt_secret: process.env.JWT_SECRET,
  email: process.env.EMAIL,
  pass: process.env.PASS,
};
