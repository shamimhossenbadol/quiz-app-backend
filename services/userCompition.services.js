import prisma from "../config/prisma.js";
import calculatePagination from "../utils/calculatePagination.js";

const addUserCompetition = async (data, addToComp) => {
  return prisma.$transaction(async (tx) => {
    const competitionData = await tx.competition.findUnique({
      where: { id: data.competitionId },
    });

    let out = null;

    if (addToComp) {
      const inc = data.coins - competitionData.entryFee;
      await tx.userHistory.update({
        where: { userId: data.userId },
        data: {
          estimatedCoins: { increment: data.coins },
          participatedQuestions: { increment: data.participatedQuestions },
          ignoredQuestions: { increment: data.ignoredQuestions },
          rightAnswers: { increment: data.rightAnswers },
          wrongAnswers: { increment: data.wrongAnswers },
          participatedQuiz: { increment: 1 },
        },
      });
      await tx.user.update({
        where: { id: data.userId },
        data: {
          coins: { increment: inc },
        },
      });
      out = await tx.userCompetition.create({ data });
    } else {
      const inc = data.coins;
      await tx.userHistory.update({
        where: { userId: data.userId },
        data: {
          estimatedCoins: { increment: data.coins },
          participatedQuestions: { increment: data.participatedQuestions },
          ignoredQuestions: { increment: data.ignoredQuestions },
          rightAnswers: { increment: data.rightAnswers },
          wrongAnswers: { increment: data.wrongAnswers },
        },
      });
      await tx.user.update({
        where: { id: data.userId },
        data: {
          coins: { increment: inc },
        },
      });
    }

    return out;
  });
};

const getCompetitionDataWithPosition = async (
  filters,
  options,
  quizId,
  userId,
) => {
  const { limit, skip, page } = calculatePagination(options);

  const conditions = [{ competition_id: parseInt(quizId) }];

  const whereConditions = conditions.length > 0 ? { AND: conditions } : {};

  const user = await prisma.userCompetition.findUnique({
    where: {
      userId_competitionId: {
        userId: parseInt(userId),
        competitionId: parseInt(quizId),
      },
    },
    include: { user: true },
  });
  const nonPaginatedResult = await prisma.userCompetition.findMany({
    where: whereConditions,
    orderBy: { coins: "desc" },
  });
  const position =
    nonPaginatedResult.findIndex((user) => user.userId === parseInt(userId)) +
    1;

  const result = await prisma.userCompetition.findMany({
    where: whereConditions,
    orderBy: { coins: "desc" },
    skip: skip,
    take: limit,
  });
  const agg = await prisma.userCompetition.aggregate({
    where: whereConditions,
    _count: true,
  });

  return {
    meta: { total: agg._count, page, limit },
    data: { position, user, users: result },
  };
};

export const userCompetitionServices = {
  addUserCompetition,
  getCompetitionDataWithPosition,
};
