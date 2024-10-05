import { Router } from "express";
import { quoteControllers } from "../controllers/quote.controllers.js";
import validateRequest from "../middleware/validateRequest.js";
import { quoteValidators } from "../validators/quoteValidators.js";
import auth from "../middleware/auth.js";

const quoteRouter = Router();

quoteRouter
  .route("/")
  .get(auth("ADMIN", "USER"), quoteControllers.getAllQuotes)
  .post(
    auth("ADMIN"),
    validateRequest(quoteValidators.createQuote),
    quoteControllers.createQuote,
  );
quoteRouter
  .route("/:id")
  .patch(
    auth("ADMIN"),
    validateRequest(quoteValidators.updateQuote),
    quoteControllers.updateQuoteById,
  )
  .delete(auth("ADMIN"), quoteControllers.deleteQuoteById);

export default quoteRouter;
