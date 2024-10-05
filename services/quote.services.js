import prisma from "../config/prisma.js";

const createQuote = async (data) => {
  return prisma.quotation.create({
    data,
  });
};

const getAllQuotes = async () => {
  return prisma.quotation.findMany();
};

const updateQuoteById = async (id, data) => {
  return prisma.quotation.update({
    where: {
      id: parseInt(id),
    },
    data,
  });
};

const deleteQuoteById = async (id) => {
  return prisma.quotation.delete({
    where: {
      id: parseInt(id),
    },
  });
};

export const quoteServices = {
  createQuote,
  getAllQuotes,
  updateQuoteById,
  deleteQuoteById,
};
