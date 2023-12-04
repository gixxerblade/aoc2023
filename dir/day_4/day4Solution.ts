import fs from 'node:fs';
import { resolve } from 'node:path';

interface Card {
  card: number,
  winningNums: number[],
  myNums: number[],
  wins: number,
}

const example1 = fs.readFileSync(resolve('example1.txt'), 'utf-8');
const example2 = fs.readFileSync(resolve('example2.txt'), 'utf-8');
const input = fs.readFileSync(resolve('day4Input.txt'), 'utf-8');

// The first match makes the card worth one point and each match after the first doubles the point value of that card.
const parseInput = (input: string) => {
  return input
    .split('\n')
    .filter((line) => line.trim() !== '')
}

const doubleScore = (countOfWinningNums: number): number => {
  return Math.floor(Math.pow(2, countOfWinningNums - 1));

}

const calculateScores = (winningNums: number[], numsHave: number[]) => {
  let count = 0;
  numsHave.forEach((num) => {
    if (winningNums.includes(num)) {
      count++;
    }
  });
  return doubleScore(count);
}

const winningCardCount = (winningNums: number[], numsHave: number[]) => {
  const winningSet = new Set(winningNums);
  const hasSet = new Set(numsHave);
  const intersection = new Set([...hasSet].filter(x => winningSet.has(x)));
  return intersection.size;
}

const range = (n: number) => [...Array(n).keys()]

const parseCards = (input: string) => {
  const lines = parseInput(input);
  return lines.map((line) => {
    const card = line.split(': ')[0].replace('Card ', '');
    const [part1, part2] = line.split(': ')[1].split(' | ');
    const numsRegEx = /\d+/g;
    const winningNums = part1.match(numsRegEx)?.map(Number) || [];
    const myNums = part2.match(numsRegEx)?.map(Number) || [];
    return { card: +card, winningNums, myNums };
  });
}

const puzzle1 = (input: string) => {
  const lines = parseCards(input);
  return lines.map(({ winningNums, myNums }) => {
    return calculateScores(winningNums, myNums);
  }).reduce((a, b) => a + b);
};

const puzzle2 = (input: string) => {
  const lines = parseCards(input);

  const cards: Record<number, number> = {};
  const incrementCount = (idx: number, value: number) => {
    cards[idx] = (cards[idx] || 0) + value;
  };

  lines.forEach(({ winningNums, myNums }, idx) => {
    incrementCount(idx, 1);
    const wins = winningCardCount(winningNums, myNums);
    if (wins > 0) {
      for (const j of range(wins)) {
        incrementCount(idx + 1 + j, cards[idx]);
      }
    }
  })
  return Object.values(cards).reduce((a, b) => a + b);
};

console.log(puzzle1(input));
console.time()
console.log(puzzle2(input));
console.timeEnd();