module.exports = function check(str, bracketsConfig) {
  let string = str.split('');
  let stack = [];
  let open = [];
  let close = [];
  let both = [];
  let closeIndex;
  let openIndex;
  let bothIndex;

  bracketsConfig.forEach(e => {
    if (e[0] === e[1]) both.push(e[0]);
    else {
      open.push(e[0]);
      close.push(e[1]);
    }
  })

  for (let i = 0; i < string.length; i++) {
    openIndex = open.indexOf(string[i]);
    if (openIndex !== -1) {
      stack.push(openIndex);
    }

    bothIndex = string[i];
    if (both.includes(string[i])) {
      if (stack[stack.length-1] === bothIndex) {
        stack.pop();
      }
      else stack.push(bothIndex);
    }

    closeIndex = close.indexOf(string[i]);
    if (closeIndex !== -1) {
      openIndex = stack.pop();
      if (closeIndex !== openIndex) return false;
    }
  }

  if(stack.length !== 0) return false;

  return true;
}
//check('|(|)', [['(', ')'], ['|', '|']]);