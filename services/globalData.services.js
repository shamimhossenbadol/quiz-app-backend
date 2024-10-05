import prisma from "../config/prisma.js";

const createGlobalData = async (data) => {
  return prisma.globalData.create({ data });
};

const getGlobalData = async () => {
  return prisma.globalData.findFirst();
};

const updateGlobalData = async (data) => {
  return prisma.globalData.update({
    where: { id: 1 },
    data,
  });
};

export const globalDataServices = {
  createGlobalData,
  getGlobalData,
  updateGlobalData,
};
