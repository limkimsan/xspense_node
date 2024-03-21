const Transaction = require('../../models/transaction');
const Category = require('../../models/category');

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

exports.getCreateTransaction = (req, res, next) => {
  Category.findAll({ raw: true, where: { transaction_type: 0 } })
    .then(incomeCates => {
      return incomeCates;
    })
    .then(incomeCates => {
      Category.findAll({ raw: true, where: { transaction_type: 1 } })
        .then(expenseCates => {
          res.render('transactions/new', {
            path: '/transactions',
            incomeCates: incomeCates,
            expenseCates: expenseCates,
            isEdit: false,
            oldInput: {
              amount: '',
              currencyType: 0,
              transactionDate: '',
              transactionType: 0,
              category: '',
              note: ''
            },
            message: '',
            messageType: ''
          });
        })
    });
}