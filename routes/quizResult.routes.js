import { Router } from "express";
import { quizResultControllers } from "../controllers/quizResults.controllers.js";
import { quizResultValidators } from "../validators/quizResults.validators.js";
import validateRequest from "../middleware/validateRequest.js";
import auth from "../middleware/auth.js";

const quizResultRouter = Router();

quizResultRouter
  .route("/")
  .get(auth("ADMIN", "USER"), quizResultControllers.getAllQuizResults)
  .post(
    auth("ADMIN", "USER"),
    validateRequest(quizResultValidators.addQuizResult),
    quizResultControllers.addQuizResult,
  );
quizResultRouter
  .route("/:id")
  .get(auth("ADMIN", "USER"), quizResultControllers.getQuizResultById)
  .patch(
    auth("ADMIN"),
    validateRequest(quizResultValidators.updateQuizResult),
    quizResultControllers.updateQuizResultById,
  )
  .delete(auth("ADMIN"), quizResultControllers.deleteQuizResultById);

export default quizResultRouter;
