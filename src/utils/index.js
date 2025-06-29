
function isAllAndLastNumberValid(lineNumbers, announcedNumbers) {
  const requiredNumbers = new Set();
  for(const lineNumber of lineNumbers) {
    lineNumber && requiredNumbers.add(lineNumber);
  }

  const markedNumbers = new Set();
  for (let i =  0; i < announcedNumbers.length; i++) {
    const number = announcedNumbers[i];
    if (requiredNumbers.has(number)) {
      markedNumbers.add(number);
      if (markedNumbers.size === requiredNumbers.size) {
        return i === announcedNumbers.length - 1;
      }
    } else {
      return false;
    }
  }
  return false;
}


module.exports = {
  isAllAndLastNumberValid
};