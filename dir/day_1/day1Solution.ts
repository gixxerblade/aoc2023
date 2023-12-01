import fs from 'node:fs';
import { resolve } from 'node:path';

const example1 = fs.readFileSync(resolve('dir/day_1/example1.txt'), 'utf-8');
const example2 = fs.readFileSync(resolve('dir/day_1/example2.txt'), 'utf-8');
const input = fs.readFileSync(resolve('dir/day_1/day1Input.txt'), 'utf-8');

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

type WordToNum  = {
  [key in 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine']: string
}

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
  };
  // const digits = /one|two|three|four|five|six|seven|eight|nine|\d/g;
  // const matches = line.match(digits);
  // console.log(matches)
  let result = '';
  let currWord = '';
  for (const char of line) {
    currWord += char;
    if (wordToNumMap[currWord as keyof WordToNum]) {
      result += wordToNumMap[currWord as keyof WordToNum];
      currWord = '';
    } else if (!isNaN(parseInt(char))) {
      result += char;
      currWord = '';
    }
  }
  return result;
}

const puzzle2 = (input: string) => {
  const solution = input
    .split('\n')
    .filter((l) => l.trim() !== '')
    .map((line, idx) => {
      const res = mapWordToNum(line)
      return +`${res[0]}${res[res.length - 1]}`
    }).reduce((a, b) => a + b);
  console.log(solution);
}

puzzle1(input);
// puzzle2(input);
console.log(mapWordToNum('6oneightskl'))
