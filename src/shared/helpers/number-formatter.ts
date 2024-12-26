const locale = (globalThis ?? window).navigator.language;

export const formatAmount = (amount: number): string => {
  const value = new Intl.NumberFormat(locale).format(amount === 0 ? 0 : amount);

  if (value === "0") {
    return "0";
  }

  return value;
};

export const parseFormattedAmount = (amount: string): number =>
  Number(amount.replace(/(,|\s)+/gim, ""));
