const prisma = require("../config/database");

const createReferral = async (data) => {
  return prisma.referral.create({ data });
};

const getAllReferrals = async () => {
  return prisma.referral.findMany();
};

module.exports = { createReferral, getAllReferrals };
