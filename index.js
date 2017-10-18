const fs = require('fs');

const argv = process.argv;
const fileName = argv.pop();

const input = fs.readFileSync(fileName, {encoding: 'utf8'});

const program = input.replace(/\n|[^\+\[\]\.\-\>\<\,]/g, '');

//console.log(program);

let inputString = 'sarah'
let inputArray = inputString.split('');
let stack = Array(2000).fill(0);
let pointer = 0;
let result = [];

const tokens = program.split('');

let loopIndex = [];
let loopDepth = 0;
let loopStartIndex = [];

tokens.forEach((el, idx) => {
  if (el == '[') {
    loopStartIndex[loopDepth++] = idx;
  } else if (el == ']') {
    loopIndex[loopStartIndex[--loopDepth]] = idx;
  }
});

for(let i = 0; i < tokens.length;) {
  switch (tokens[i]) {
    case '>':
      pointer++;
    break;
    case '<':
      pointer--;
    break;
    case '+':
      stack[pointer] += 1;
    break;
    case '-':
      stack[pointer] -= 1;
    break;
    case '.':
      result.push(String.fromCharCode(stack[pointer]));
    break;
    case ',':
      stack[pointer] = inputArray.length ? inputArray.shift().charCodeAt(0) : -1;
    break;
    case '[':
      if (stack[pointer] === 0) {
        i = loopIndex[i];
        continue;
      }
    break;
    case ']':
      if (stack[pointer] === 0) {
        i++;
      } else {
        i = loopIndex.indexOf(i);
      }
      continue;
    break;
    default:
      console.log('Unknown token: ' + tokens[i]);
    break;
  }
  i++;
}

console.log(result.join(''));
