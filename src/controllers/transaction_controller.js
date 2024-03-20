const Transaction = require('../../models/transaction');

exports.getTransactions = (req, res, next) => {
  Transaction.findAll()
    .then(transactions => {
      res.render('transactions/index', {
        path: '/transactions',
        transactions: transactions,
        message: '',
        messageType: ''
      });
    })
}