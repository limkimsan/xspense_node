const crypto = require('crypto');
const { validationResult } = require('express-validator');

const Transaction = require('../../models/transaction');
const Category = require('../../models/category');
const { currencyFormat } = require('../util/number');

const renderTransactionForm = (path, req, res, isEdit, message, messageType) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, '0');

  Category.findAll({ raw: true, where: { transaction_type: 0 } })
    .then(incomeCates => {
      return incomeCates;
    })
    .then(incomeCates => {
      Category.findAll({ raw: true, where: { transaction_type: 1 } })
        .then(expenseCates => {
          res.render(path, {
            path: '/transactions',
            incomeCates: incomeCates,
            expenseCates: expenseCates,
            isEdit: isEdit,
            maxDate: `${year}-${month}-${day}`,
            oldInput: {
              amount: req.body.amount,
              currency_type: req.body.currency_type,
              transaction_date: req.body.transaction_date,
              transaction_type: req.body.transaction_type,
              category_id: req.body.categoryId,
              note: req.body.note
            },
            message: message,
            messageType: messageType
          });
        })
    });
}

exports.getTransactions = (req, res, next) => {
  Transaction.findAll()
    .then(async transactions => {
      let formattedTranscations = [];
      for (let tran of transactions) {
        const category = await tran.getCategory();
        formattedTranscations.push({...tran.dataValues, category: category.dataValues });
      }
      return formattedTranscations;
    })
    .then(formattedTranscations => {
      res.render('transactions/index', {
        path: '/transactions',
        transactions: formattedTranscations,
        currencyFormat: currencyFormat,
        message: '',
        messageType: ''
      });
    });
}

exports.getCreateTransaction = (req, res, next) => {
  Category.findAll({ raw: true, where: { transaction_type: 0 } })
    .then(incomeCates => {
      return incomeCates;
    })
    .then(incomeCates => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
      const day = String(date.getDate()).padStart(2, '0');

      Category.findAll({ raw: true, where: { transaction_type: 1 } })
        .then(expenseCates => {
          res.render('transactions/new', {
            path: '/transactions',
            incomeCates: incomeCates,
            expenseCates: expenseCates,
            isEdit: false,
            maxDate: `${year}-${month}-${day}`,
            oldInput: {
              amount: '',
              currency_type: null,
              transaction_date: '',
              transaction_type: null,
              category_id: null,
              note: ''
            },
            message: '',
            messageType: ''
          });
        })
    });
}

exports.postCreateTransaction = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg;
    return renderTransactionForm('transactions/new', req, res, false, message, 'error');
  }

  Transaction.create({
    id: crypto.randomUUID(),
    amount: parseFloat(req.body.amount),
    currencyType: parseInt(req.body.currency_type),
    transactionDate: new Date(req.body.transaction_date),
    transactionType: parseInt(req.body.transaction_type),
    categoryId: req.body.categoryId,
    note: req.body.note,
    userId: req.session.user.id
  })
  .then(transaction => {
    res.redirect('/transactions');
  })
  .catch(err => {
    renderTransactionForm('transactions/new', req, res, false, 'Failed to create new transaction!', 'error');
  })
}