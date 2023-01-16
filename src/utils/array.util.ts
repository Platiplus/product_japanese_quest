export const getRandomElement = <T>(arr: T[]) => {
  if (arr.length) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
}
