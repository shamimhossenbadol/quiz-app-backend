import { z } from "zod";

const createCompetition = z.object({
  body: z.strictObject({
    name: z.string(),
    date: z.string(),
  }),
});

export const competitionValidators = {
  createCompetition,
};
