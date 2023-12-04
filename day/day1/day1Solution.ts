import fs from 'node:fs';
import { resolve } from 'node:path';

const example1 = fs.readFileSync(resolve('example1.txt'), 'utf-8');
const example2 = fs.readFileSync(resolve('example2.txt'), 'utf-8');
const input = fs.readFileSync(resolve('day1Input.txt'), 'utf-8');

const puzzle1 = (input: string) => {
  const solution = input
    .split('\n')
    .filter((l) => l.trim() !== '')
    .map((line) => {
      const nums = line.replace(/[a-z]/g, '');
      const needed = `${nums[0]}${nums[nums.length - 1]}`
      return +needed
    }).reduce((a, b) => a + b);
  console.log(solution);
}

type WordToNum = {
  [key in 'oneight' | 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eightwo' | 'eight' | 'nine' | 'oneight' |
  'twone' |
  'threeight' |
  'fiveight' |
  'sevenine' |
  'eightwo' |
  'nineight']: string
}
/**
 * 'oneight'|
 * 'twone'|
 * 'threeight'|
 * 'fiveight'|
 * 'sevenine'|
 * 'eightwo'|
 * 'nineight'|
 */
export const mapWordToNum = (line: string) => {
  const wordToNumMap: WordToNum = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    oneight: '18',
    eightwo: '82',
    twone: '21',
    threeight: '38',
    fiveight: '58',
    sevenine: '79',
    nineight: '98',
  };
  const digits = /oneight|eightwo|twone|threeight|fiveight|sevenine|nineight|one|two|three|four|five|six|seven|eight|nine|\d/g;
  const matches = line.match(digits);
  let result = '';
  if (matches) {
    matches.forEach((match) => {
      if (wordToNumMap[match as keyof WordToNum]) {
        result += wordToNumMap[match as keyof WordToNum]
      } else {
        result += match;
      }
    })
  }
  console.log(result)
  return result;
}

const puzzle2 = (input: string) => {
  const solution = input
    .split('\n')
    .filter((l) => l.trim() !== '')
    .map((line, idx) => {
      const res = mapWordToNum(line)
      if (res) {
        return +`${res[0]}${res[res.length - 1]}`
      }
      return 0;
    }).reduce((a, b) => a + b);
  console.log(solution);
}

// puzzle1(input);
puzzle2(input);
// console.log(mapWordToNum('6oneightskl'))
