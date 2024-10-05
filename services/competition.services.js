import prisma from "../config/prisma.js";

const createCompetition = async (data) => {
  return prisma.competition.create({ data });
};

const getAllCompetitions = async () => {
  return prisma.competition.findMany({ where: {} });
};

export const competitionServices = { createCompetition, getAllCompetitions };
