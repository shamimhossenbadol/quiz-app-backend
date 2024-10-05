import { Router } from "express";
import { userCompetitionControllers } from "../controllers/userCompetition.controllers.js";
import validateRequest from "../middleware/validateRequest.js";
import { userCompetitionValidators } from "../validators/userCompetition.validators.js";
import auth from "../middleware/auth.js";

const userCompetitionRouter = Router();

userCompetitionRouter
  .route("/")
  .post(
    auth("ADMIN", "USER"),
    validateRequest(userCompetitionValidators.addCompetitionData),
    userCompetitionControllers.postCompetitionData,
  )
  .get(
    auth("ADMIN", "USER"),
    userCompetitionControllers.getCompetitionDataWithPosition,
  );

export default userCompetitionRouter;
