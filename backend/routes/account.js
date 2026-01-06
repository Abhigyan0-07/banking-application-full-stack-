const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account, User } = require("../db");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount, to, transactionPin } = req.body;

  // ----- Verify Transaction PIN -----
  const user = await User.findOne({ _id: req.userId }).session(session);

  if (!user) {
    await session.abortTransaction();
    return res.status(404).json({ message: "User not found" });
  }

  // Fix for legacy users without PIN
  if (!user.transactionPin) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Transaction PIN not set for this account. Please contact support." });
  }

  const validPin = await bcrypt.compare(transactionPin, user.transactionPin);

  if (!validPin) {
    await session.abortTransaction();
    return res.status(401).json({ message: "Invalid Transaction PIN" });
  }
  // ----------------------------------

  // ----- Simulated Failures logic -----
  const recipientUser = await User.findById(to).session(session);
  
  if (recipientUser) {
    // Case 1: Transfer to "Person X" - Simulate Timeout/Waiting
    if (recipientUser.firstName === "Person X" || recipientUser.firstName === "PersonX") {
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds
        await session.abortTransaction();
        return res.status(504).json({ message: "Transaction failed due to request timeout" });
    }

    // Case 2: Transfer to "Person Y" - Simulate Generic Error
    if (recipientUser.firstName === "Person Y" || recipientUser.firstName === "PersonY") {
        await session.abortTransaction();
        return res.status(500).json({ message: "Transaction failed due to an unknown system error" });
    }
  }
  // ------------------------------------

  const { amount: transferAmount } = req.body; 

  // Don't allow transfer to oneself
  if (to === req.userId) {
    await session.abortTransaction();
    return res.json({ message: "Cannot Transfer to yourself!" });
  }

  // Fetch the accounts within transaction
  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  // Fetch the accounts within transaction
  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer within transaction
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit Transaction
  await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
});

module.exports = router;
