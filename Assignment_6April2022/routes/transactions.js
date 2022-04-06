var express = require('express');
var router = express.Router();
const {sequelize} = require('../models');
const transactionModel = require('../models').Transaction;
const balanceModel = require('../models').Balance;

router.get('/', function (req, res, next) {
  transactionModel.findAll().then(
    function (transactions) {
      res.status(200).json(transactions);
    },
    function (error) {
      res.status(500).json(error);
    }
  );
});

router.post('/', async (req, res) => {
  const {sender, receiver, transaction_amount} = req.body;
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const sendUser = await balanceModel.findOne({where: {userId: sender}});
    const receiveUser = await balanceModel.findOne({where: {userId: receiver}});
    await balanceModel.update(
      {balance: sendUser.balance - parseFloat(transaction_amount)},
      {
        where: {
          userId: sender,
        },
      },
      {transaction}
    );
    await balanceModel.update(
      {balance: receiveUser.balance + parseFloat(transaction_amount)},
      {
        where: {
          userId: receiver,
        },
      },
      {transaction}
    );
    transactionModel.create({
      transaction_date: new Date().toLocaleString(),
      transaction_amount,
    });
    await transaction.commit();
    res.json({status: 1, msg: 'success'});
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    res.json({status: 0, error});
  }
});
module.exports = router;
