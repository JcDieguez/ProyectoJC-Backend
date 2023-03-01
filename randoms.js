export function getRandomNumbers(count) {
  const numbers = {};
  for (let i = 0; i < count; i++) {
    const random = Math.floor(Math.random() * 1000) + 1;
    numbers[random] = (numbers[random] || 0) + 1;
  }
  return numbers;
}