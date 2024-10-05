import { z } from "zod";

const addQuizResult = z.object({
  body: z.strictObject({
    title: z.string(),
    description: z.string(),
    winner1Id: z.number(),
    winner2Id: z.number(),
    winner3Id: z.number(),
    winner4Id: z.number(),
    winner5Id: z.number(),
    prizeStatus: z.string(),
  }),
});

const updateQuizResult = z.object({
  body: z.strictObject({
    title: z.string().optional(),
    description: z.string().optional(),
    winner1Id: z.number().optional(),
    winner2Id: z.number().optional(),
    winner3Id: z.number().optional(),
    winner4Id: z.number().optional(),
    winner5Id: z.number().optional(),
    prizeStatus: z.string().optional(),
  }),
});

export const quizResultValidators = { addQuizResult, updateQuizResult };
