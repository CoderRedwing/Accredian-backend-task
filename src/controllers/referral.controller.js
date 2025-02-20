const prisma = require("../config/database");
const { createReferral, getAllReferrals } = require("../services/referral.service");
const sendEmail = require("../config/email");

const submitReferral = async (req, res) => {
  try {
    const { name, email, phone, referredBy } = req.body;

    if (!name || !email || !phone || !referredBy) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingReferral = await prisma.referral.findFirst({
      where: {
        OR: [
          { email: email },
          { phone: phone },
        ]
      }
    });

    if (existingReferral) {
      return res.status(400).json({
        error: "A referral with this email or phone number already exists."
      });
    }

    const newReferral = await createReferral({ name, email, phone, referredBy });
      
    await sendEmail(email, "Referral Submitted", `Thank you, ${name}, for your referral!`);

    return res.status(201).json(newReferral);
  } catch (error) {
    console.error("Error submitting referral:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getReferrals = async (_req, res) => {
  try {
    const referrals = await getAllReferrals();
    return res.json(referrals);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch referrals" });
  }
};

module.exports = { submitReferral, getReferrals };
