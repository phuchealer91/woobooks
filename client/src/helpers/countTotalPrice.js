export const countTotalPrice = (data) => {
  return data.reduce((curr, next) => {
    return curr + next.total
  }, 0)
}
