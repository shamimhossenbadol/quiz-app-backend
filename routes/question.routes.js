import { Router } from "express";
import { questionControllers } from "../controllers/question.controllers.js";
import validateRequest from "../middleware/validateRequest.js";
import { questionValidators } from "../validators/question.validators.js";
import auth from "../middleware/auth.js";

const questionRouter = Router();

questionRouter
  .route("/")
  .post(
    validateRequest(questionValidators.createQuestion),
    questionControllers.createQuestion,
  )
  .get(questionControllers.getAllQuestions);
questionRouter
  .route("/:id")
  .get(auth("ADMIN", "USER"), questionControllers.getQuestionById)
  .patch(
    auth("ADMIN"),
    validateRequest(questionValidators.updateQuestion),
    questionControllers.updateQuestionById,
  )
  .delete(auth("ADMIN"), questionControllers.deleteQuestionById);

export default questionRouter;
