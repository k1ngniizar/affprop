export function wholeToFrac(value: number): string {
  const format = (num: number) => Number(num.toFixed(1)).toString();

  if (value >= 1_000_000_000) {
    return `${format(value / 1_000_000_000)}B`;
  }

  if (value >= 1_000_000) {
    return `${format(value / 1_000_000)}M`;
  }

  if (value >= 1_000) {
    return `${format(value / 1_000)}K`;
  }

  return value.toString();
}
