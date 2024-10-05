import { z } from "zod";

const addCompetitionData = z.object({
  body: z.strictObject({
    userId: z.number(),
    competitionId: z.number(),
    participatedQuestions: z.number(),
    ignoredQuestions: z.number(),
    rightAnswers: z.number(),
    wrongAnswers: z.number(),
    coins: z.number(),
  }),
});

export const userCompetitionValidators = {
  addCompetitionData,
};
