import express from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import questionRouter from "./question.routes.js";
import globalDataRouter from "./globalData.routes.js";
import quizResultRouter from "./quizResult.routes.js";
import competitionRouter from "./competiton.routes.js";
import userCompetitionRouter from "./userCompetition.routes.js";
import quoteRouter from "./quote.routes.js";

const router = express.Router();

const routes = [
  { path: "/auth", route: authRouter },
  { path: "/users", route: userRouter },
  { path: "/questions", route: questionRouter },
  { path: "/global-data", route: globalDataRouter },
  { path: "/quiz-results", route: quizResultRouter },
  { path: "/competitions", route: competitionRouter },
  { path: "/results", route: userCompetitionRouter },
  { path: "/quotations", route: quoteRouter },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
