export const reduceToSingleDigit = (value: number): number => {
  let n = Math.abs(value);
  while (n > 9) {
    n = n
      .toString()
      .split("")
      .reduce((sum, ch) => sum + Number(ch), 0);
  }
  return n;
};

export const sumDigits = (value: number): number =>
  value
    .toString()
    .split("")
    .reduce((sum, ch) => sum + Number(ch), 0);

export const calculatePersonalYearNumber = (
  birthDate: Date,
  targetYear: number
): number => {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const universalYear = reduceToSingleDigit(sumDigits(targetYear));
  return reduceToSingleDigit(month + day + universalYear);
};
