import express from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import router from "./routes/routes.js";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/v1", router);
app.use(globalErrorHandler);

app.get("/", async (req, res) => {
  res.send("Quiz App Backend.");
});

export default app;
