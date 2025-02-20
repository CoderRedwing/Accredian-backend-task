const express = require("express");
const { submitReferral, getReferrals } = require("../controllers/referral.controller");

const router = express.Router();

router.post("/", submitReferral);
router.get("/", getReferrals);

module.exports = router;
