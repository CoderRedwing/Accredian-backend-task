const express = require("express");
const referralRoutes = require("./referral.routes");

const router = express.Router();

router.use("/referrals", referralRoutes);

module.exports = router;
