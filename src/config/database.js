const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => console.log("Connected to PostgreSQL Database"))
  .catch((err) => console.error("Database Connection Error:", err.message));

module.exports = prisma;
