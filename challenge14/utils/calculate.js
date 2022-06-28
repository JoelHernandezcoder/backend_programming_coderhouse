function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function calculate(cant) {
  const numbers = [];
  const values = {};
  for (let i = 0; i < cant; i++) {
    numbers.push(getRandomInt(1, 1000));
  }
  numbers.map((val) => {
    values[val] = numbers.filter((v) => v == val).length;
  });
  return values;
}

process.on('message', (cant) => {
  const result = calculate(cant);
  process.send(result);
});
