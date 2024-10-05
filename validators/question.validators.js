import { z } from "zod";

const createQuestion = z.object({
  body: z.strictObject({
    question: z.string(),
    option1: z.string(),
    option2: z.string(),
    option3: z.string(),
    option4: z.string(),
    rightAnswer: z.string(),
    year: z.number(),
  }),
});

const updateQuestion = z.object({
  body: z.strictObject({
    question: z.string().optional(),
    option1: z.string().optional(),
    option2: z.string().optional(),
    option3: z.string().optional(),
    option4: z.string().optional(),
    rightAnswer: z.string().optional(),
    year: z.number().optional(),
  }),
});

export const questionValidators = { createQuestion, updateQuestion };
