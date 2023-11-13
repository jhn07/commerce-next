export const isDiscount = (saleday: number) => {
  const currentDate = new Date()
  return currentDate.getDate() === saleday && currentDate.getMonth() === 10
  // // Месяцы в JavaScript начинаются с 0 (0 - январь, 1 - февраль и так далее)
}