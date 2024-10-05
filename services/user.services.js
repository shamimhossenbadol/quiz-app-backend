import prisma from "../config/prisma.js";
import ApiError from "../errors/apiError.js";
import calculatePagination from "../utils/calculatePagination.js";

const createUser = async (data) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({ data });
    const history = await tx.userHistory.create({ data: { userId: user.id } });
    return { ...user, history: history };
  });
};

const getUserById = async (id) => {
  return prisma.user.findUnique({ where: { id: parseInt(id) } });
};

const getUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
    include: { history: true },
  });
};

const getPaginatedUsers = async (filters, options) => {
  const { limit, skip, page, sortBy, sortOrder } = calculatePagination(options);
  const { search, ...filterData } = filters;

  const conditions = [];

  if (search) {
    conditions.push({
      OR: ["name", "email"].map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    conditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditions = conditions.length > 0 ? { AND: conditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    orderBy: { [sortBy]: sortOrder },
    skip: skip,
    take: limit,
  });
  const agg = await prisma.user.aggregate({
    where: whereConditions,
    _count: true,
  });

  return {
    meta: { total: agg._count, page, limit },
    data: result,
  };
};

const updateUserById = async (id, data) => {
  return prisma.user.update({ where: { id: parseInt(id) }, data });
};

const deleteUserById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
  if (user.role === "ADMIN")
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Admins cannot be deleted using APIs. Contact administrator.",
    );
  return prisma.$transaction(async (tx) => {
    await tx.userCompetition.deleteMany({ where: { userId: parseInt(id) } });
    await tx.userHistory.delete({ where: { userId: parseInt(id) } });
    return tx.user.delete({ where: { id: parseInt(id) } });
  });
};

export const userServices = {
  createUser,
  getUserById,
  getUserByEmail,
  getPaginatedUsers,
  updateUserById,
  deleteUserById,
};
