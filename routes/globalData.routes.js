import { Router } from "express";
import { globalDataControllers } from "../controllers/globalData.controllers.js";
import validateRequest from "../middleware/validateRequest.js";
import { globalDataValidators } from "../validators/globalData.validators.js";
import auth from "../middleware/auth.js";

const globalDataRouter = Router();

globalDataRouter
  .route("/")
  .get(auth("ADMIN", "USER"), globalDataControllers.getGlobalData)
  .post(
    auth("ADMIN"),
    validateRequest(globalDataValidators.createGlobalData),
    globalDataControllers.createGlobalData,
  )
  .patch(
    auth("ADMIN"),
    validateRequest(globalDataValidators.updateGlobalData),
    globalDataControllers.updateGlobalData,
  );

export default globalDataRouter;
