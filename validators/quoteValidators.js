import { z } from "zod";

const createQuote = z.object({
  body: z.object({
    text: z.string(),
    reference: z.string(),
  }),
});

const updateQuote = z.object({
  body: z.object({
    text: z.string().optional(),
    reference: z.string().optional(),
  }),
});

export const quoteValidators = {
  createQuote,
  updateQuote,
};
