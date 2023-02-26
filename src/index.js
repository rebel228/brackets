module.exports = function check(str, bracketsConfig) {
//const check = function (str, bracketsConfig) {
  let boolean = true;
  let string = str.split('');
  console.log('base:', string);
  const closingBracketsArray = [];
  const openingBracketsArray = [];
  for (let i = 0; i < bracketsConfig.length; i++) {
    closingBracketsArray.push(bracketsConfig[i][1]);
  }
  for (let i = 0; i < bracketsConfig.length; i++) {
    openingBracketsArray.push(bracketsConfig[i][0]);
  }
  let brack = closingBracketsArray.join('');
  let brackOpen = openingBracketsArray.join('');
  console.log(typeof(brack), brack);
  for (let i = 0; i < bracketsConfig.length; i++) {
    let open = bracketsConfig[i][0];
    let close = bracketsConfig[i][1];
    console.log('brackets:', open, close);
    console.log(!searchThrough(string, open, close, brack, brackOpen));
    if (!searchThrough(string, open, close, brack, brackOpen)) {
      boolean = false;
      break;
    }
  };
  return boolean;
}
const searchThrough = function (string, open, close, closingBrackets, openingBrackets) {
  let value = true;
  let closedBracketsArray = closingBrackets.split('');
  let openedBracketsArray = openingBrackets.split('');
  for (let i = 0; i < string.length; i++) {
    if (!value) break;
    if (string[i] === close && open !== close) {
      value = false;
      break;
    };
    if (string[i] === open) {
      value = false;
      for (let n = i + 1; n < string.length; n++) {
        if(closedBracketsArray.includes(string[n]) && string[n] !== close) {
          value = false;
          console.log(string[n]);
          let opposedBracket = openingBrackets[closedBracketsArray.indexOf(string[n])];
          console.log('opposed bracket', openingBrackets[closedBracketsArray.indexOf(string[n])]);
          console.log ('i=', i);
          console.log ('n=', n);
          for (let x = n - 1; x >= i; x--) {
            console.log(string[x], ' ?? ', opposedBracket);
            if(string[x] === opposedBracket) {
              value = true;
              break;
            };
          }
          if (string[n] !== opposedBracket) return value;
          else {
            for (let x = n + 1; x < string.length - 1; x++) {
              console.log(string[x], ' ?? ', opposedBracket);
              if (string[x] === close) break;
              if (string[x] === opposedBracket) {
                value = true;
                break;
              };
            }
            if (value === false) return value;
          }
        }
        if (string[n] === close) {
          value = true;
          string.splice(i, 1, '0');
          string.splice (n, 1, '0');
          break;
        }
      }
    }
  }
  return value;
}
//check('|(|)', [['(', ')'], ['|', '|']]);