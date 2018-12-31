export function choose<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomBetween(low: number, high: number) {
  return Math.floor(Math.random() * high) + low;
}
