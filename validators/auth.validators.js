import { z } from "zod";

const signUp = z.object({
  body: z.strictObject({
    name: z.string(),
    number: z.string(),
    email: z.string().email().toLowerCase(),
    password: z.string(),
    village: z.string(),
    postOffice: z.string(),
    thana: z.string(),
    zilla: z.string(),
  }),
});

const login = z.object({
  body: z.strictObject({
    email: z.string().email().toLowerCase(),
    password: z.string(),
  }),
});

const requestOtp = z.object({
  body: z.strictObject({
    email: z.string().email().toLowerCase(),
  }),
});

const resetPassword = z.object({
  body: z.strictObject({
    email: z.string().email().toLowerCase(),
    otp: z.string(),
    password: z.string(),
  }),
});

export const authValidators = { signUp, login, requestOtp, resetPassword };
