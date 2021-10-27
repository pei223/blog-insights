export const roundDigit = (num: number, digit: number): number => {
  const base = Math.pow(10, digit - 1)
  return Math.round(num * base) / base
}
