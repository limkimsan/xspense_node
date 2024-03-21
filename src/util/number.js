exports.currencyFormat = (number, currencyType) => {
  if (currencyType == 0)
    return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  
  return number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}