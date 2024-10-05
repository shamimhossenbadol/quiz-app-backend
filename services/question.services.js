import prisma from "../config/prisma.js";

const createQuestion = async (data) => {
  return prisma.question.create({ data });
};

const getQuestionById = async (id) => {
  return prisma.question.findUnique({ where: { id: parseInt(id) } });
};

const getAllQuestions = async () => {
  return prisma.question.findMany();
};

const updateQuestionById = async (id, data) => {
  return prisma.question.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteQuestionById = async (id) => {
  return prisma.question.delete({ where: { id: parseInt(id) } });
};

export const questionServices = {
  createQuestion,
  getQuestionById,
  getAllQuestions,
  updateQuestionById,
  deleteQuestionById,
};
