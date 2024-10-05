import prisma from "../config/prisma.js";

const addQuizResult = async (data) => {
  return prisma.quizResult.create({ data });
};

const getQuizResultById = async (id) => {
  return prisma.quizResult.findUnique({
    where: { id: parseInt(id) },
    include: {
      winner1: true,
      winner2: true,
      winner3: true,
      winner4: true,
      winner5: true,
    },
  });
};

const getAllQuizResults = async () => {
  return prisma.quizResult.findMany({
    where: {},
    include: {
      winner1: true,
      winner2: true,
      winner3: true,
      winner4: true,
      winner5: true,
    },
  });
};

const updateQuizResultById = async (id, data) => {
  return prisma.quizResult.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteQuizResultById = async (id) => {
  return prisma.quizResult.delete({ where: { id: parseInt(id) } });
};

export const quizResultServices = {
  addQuizResult,
  getQuizResultById,
  getAllQuizResults,
  updateQuizResultById,
  deleteQuizResultById,
};
