 const invoiceGen = (id) => {
  let invoiceNum = id.toString();
  while (invoiceNum.length <6) invoiceNum = "0" + invoiceNum;
  return "FIX"+invoiceNum;
}

module.exports = invoiceGen;