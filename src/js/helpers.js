// Export a function that formats the input number
// Add a second parameter `withCurrency` that defaults to false
export const formatMoney = (amount, withCurrency = false) => {
  // Define the options for the formatter
  const options = {
    style: withCurrency ? 'currency' : 'decimal',
    currency: 'PLN', // Only used when `withCurrency` is true
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  // Create an instance of Intl.NumberFormat with the given options
  const formatter = new Intl.NumberFormat('pl-PL', options);

  // Format and return the amount
  return formatter.format(amount);
};

export default { formatMoney };
