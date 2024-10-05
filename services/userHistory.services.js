import prisma from "../config/prisma.js";

const getHistoryByUserId = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: { history: true },
  });

  const details = Object.keys(user)
    .filter((objKey) => objKey !== "history")
    .reduce((newObj, key) => {
      newObj[key] = user[key];
      return newObj;
    }, {});

  return { user: details, history: user.history };
};

const updateHisotryByUserId = async (userId, data) => {
  return prisma.userHistory.update({
    where: {
      userId: parseInt(userId),
    },
    data,
  });
};

export const userHistoryServices = {
  getHistoryByUserId,
  updateHisotryByUserId,
};
