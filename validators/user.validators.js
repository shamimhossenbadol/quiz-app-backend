import { z } from "zod";

const updateUser = z.object({
  body: z.strictObject({
    name: z.string().optional(),
    number: z.string().optional(),
    village: z.string().optional(),
    postOffice: z.string().optional(),
    thana: z.string().optional(),
    zilla: z.string().optional(),
  }),
});

const updateUserHistory = z.object({
  body: z.strictObject({
    estimatedCoins: z.number().optional(),
    participatedQuestions: z.number().optional(),
    ignoredQuestions: z.number().optional(),
    rightAnswers: z.number().optional(),
    wrongAnswers: z.number().optional(),
    participatedQuiz: z.number().optional(),
    winner: z.number().optional(),
  }),
});

export const userValidators = { updateUser, updateUserHistory };
