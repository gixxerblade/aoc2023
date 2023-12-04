import fs from 'node:fs';
import { resolve } from 'node:path';

interface Line {
  num: number,
  line: number,
  rangeAbove: string | undefined,
  range: string,
  rangeBelow: string | undefined,
  hasSymbolNear: boolean,
}
const example1 = fs.readFileSync(resolve('example1.txt'), 'utf-8');
const input = fs.readFileSync(resolve('day3Input.txt'), 'utf-8');

const parseInput = (input: string) => {
  return input
    .split('\n')
    .filter((line) => line.trim() !== '')
}

const puzzle1 = (input: string) => {
  const numsToAdd: Line[] = [];
  const lines = parseInput(input);
  lines.forEach((line, idx) => {
    const numsRegEx = /\d+/g;
    const numsMatch = line.match(numsRegEx);
    const lineAbove = idx > 0 ? lines[idx - 1] : null;
    const lineBelow = idx < lines.length - 1 ? lines[idx + 1] : null;

    if (numsMatch) {
      numsMatch.forEach((num) => {
        const partNumberRegEx = new RegExp(`(?:^|[^0-9])${num}(?:[^0-9]|$)`, 'g');
        const match = partNumberRegEx.exec(line);
        if (match) {
          const start = match.index;
          const end = start + match[0].length;
          const partNumbers = line.slice(start, end);
          const adjacentAbove = lineAbove?.slice(start, end);
          const adjacentBelow = lineBelow?.slice(start, end);
          const symbolsRegEx = /[^0-9.]/g;
          const hasSymbolNear = symbolsRegEx.test(adjacentAbove + partNumbers + adjacentBelow);

          if (hasSymbolNear) {
            numsToAdd.push({
              num: +num,
              line: idx + 1,
              rangeAbove: adjacentAbove,
              range: partNumbers,
              rangeBelow: adjacentBelow,
              hasSymbolNear,
            })
          }
        }
      });
    }
  });
  console.log(numsToAdd);
  return numsToAdd.reduce((a, { num: b }) => a + b, 0);
};
  
  // Example usage
  const jayInput = `12.......*..\n+.........34\n.......-12..\n..78........\n..*....60...\n78.........9\n.5.....23..$\n8...90*12...\n............\n2.2......12.\n.*.........*\n1.1..503+.56`.trim();

console.log(puzzle1(jayInput));

const puzzle2 = (input: string) => { };
