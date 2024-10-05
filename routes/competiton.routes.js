import { Router } from "express";
import { competitionControllers } from "../controllers/competition.controllers.js";
import validateRequest from "../middleware/validateRequest.js";
import { competitionValidators } from "../validators/competition.validators.js";
import auth from "../middleware/auth.js";

const competitionRouter = Router();

competitionRouter
  .route("/")
  .get(auth("ADMIN", "USER"), competitionControllers.getAllCompetitions)
  .post(
    auth("ADMIN"),
    validateRequest(competitionValidators.createCompetition),
    competitionControllers.createCompetition,
  );

export default competitionRouter;
