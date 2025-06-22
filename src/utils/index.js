function areAllNumbersAnnounced(lineNumbers, announcedNumbers) {
  const announcedSet = new Set(announcedNumbers);
  for (const number of lineNumbers) {
    if (!announcedSet.has(number)) {
      return false;
    }
  }
  return true;
}

function isLastNumberValid(lineNumbers, announcedNumbers) {
  const requiredNumbers = new Set(lineNumbers);
  const markedNumbers = new Set();

  for (let i = 0; i < announcedNumbers.length; i++) {
    const number = announcedNumbers[i];
    if (requiredNumbers.has(number)) {
      markedNumbers.add(number);
      if (markedNumbers.size === requiredNumbers.size) {
        return i === announcedNumbers.length - 1;
      }
    }
  }

  return false;
}


module.exports = {
  areAllNumbersAnnounced,
  isLastNumberValid
};