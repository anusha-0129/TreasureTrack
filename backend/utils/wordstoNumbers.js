const wordsToNumbers = (str) => {
    const units = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const scales = { 'hundred': 100, 'thousand': 1000,'lakh': 100000, 'crore': 10000000};
  
    const words = str.toLowerCase().split(/[\s-]+/);
    let total = 0;
    let current = 0;
  
    words.forEach(word => {
      if (units.includes(word)) {
        current += units.indexOf(word);
      } else if (teens.includes(word)) {
        current += teens.indexOf(word) + 10;
      } else if (tens.includes(word)) {
        current += (tens.indexOf(word) + 2) * 10;
      } else if (scales[word]) {
        current *= scales[word];
        total += current;
        current = 0;
      }
    });
  
    return total + current;
  };
  export default wordsToNumbers;