const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL Database");
  } catch (err) {
    console.error("Database Connection Error:", err.message);
    process.exit(1); 
  }
}

connectDB();

module.exports = prisma;

