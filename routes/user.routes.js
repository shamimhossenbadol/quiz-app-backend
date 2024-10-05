import { Router } from "express";
import { userControllers } from "../controllers/user.controllers.js";
import validateRequest from "../middleware/validateRequest.js";
import { userValidators } from "../validators/user.validators.js";
import { userHistoryControllers } from "../controllers/userHistory.controllers.js";
import auth from "../middleware/auth.js";

const userRouter = Router();

userRouter.route("/").get(auth("ADMIN"), userControllers.getPaginatedUsers);
userRouter
  .route("/history/:id")
  .get(auth("ADMIN", "USER"), userHistoryControllers.getHistoryByUserId)
  .patch(
    auth("ADMIN", "USER"),
    validateRequest(userValidators.updateUserHistory),
    userHistoryControllers.updateHistoryByUserId,
  );
userRouter
  .route("/:id")
  .get(auth("ADMIN", "USER"), userControllers.getUserById)
  .patch(
    auth("ADMIN", "USER"),
    validateRequest(userValidators.updateUser),
    userControllers.updateUserById,
  )
  .delete(auth("ADMIN"), userControllers.deleteUserById);

export default userRouter;
