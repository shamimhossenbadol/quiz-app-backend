import { z } from "zod";

const createGlobalData = z.object({
  body: z.strictObject({
    nextCompetition: z.string(),
    alertDialog: z.string(),
    showAlert: z.boolean(),
    competitionTime: z.boolean(),
    entryFee: z.number(),
  }),
});

const updateGlobalData = z.object({
  body: z.strictObject({
    nextCompetition: z.string().optional(),
    alertDialog: z.string().optional(),
    showAlert: z.boolean().optional(),
    competitionTime: z.boolean().optional(),
    entryFee: z.number().optional(),
  }),
});

export const globalDataValidators = {
  createGlobalData,
  updateGlobalData,
};
