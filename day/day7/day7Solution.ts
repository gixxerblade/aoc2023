import fs from 'node:fs';
import { resolve } from 'node:path';

const example1 = fs.readFileSync(resolve('example1.txt'), 'utf-8');
const input = fs.readFileSync(resolve('input.txt'), 'utf-8');

type HandStrength<T = number, U = string[]> = [T, U];

interface Plays {
  hand: string,
  bid: number
}

const parseInput = (input: string) => {
  return input
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => {
      const [hand, bid] = line.split(' ')
      return { hand, bid: +bid }
    })
}

const handCount = (hand: string) => {
  const count: Record<string, number> = {}
  for (const card of hand) {
    count[card] = count[card] + 1 || 1;
  }
  return count;
}

const handType = (hand: string) => {
  const count = handCount(hand);
  let score = 0;
  switch (Object.keys(count).length) {
    case 1: // five of kind AAAAA
      score = 6;
      break;
    case 2: // four of a kind or full house AAAAK || AAAKK
      const fourOfKind = Object.values(count).some((val) => val === 4);
      score = fourOfKind ? 5 : 4;
      break;
    case 3: // 3 of a kind or two pair AAAKQ || AAKKQ
      const threeOfKind = Object.values(count).some((n) => n === 3);
      score = threeOfKind ? 3 : 2
      break;
    case 4: // pair AAKQJ
      score = 1
      break;
    default: // no hand AKQJT
      score = 0;
      break;
  }
  return score;
}

// const handType2 = (hand: string) => {
//   const count = handCount(hand);
//   let score = 0;
//   if (!Object.keys(count).includes('J')) {
//     console.log(hand)
//     score = handType(hand);
//   } else {
//     const countOfJ = count['J'];
//   }
//   return score;
// }

const strength = (hand: string): HandStrength => {
  const map: Record<string, string> = {
    T: 'A',
    J: 'B',
    Q: 'C',
    K: 'D',
    A: 'E',
  } as const;
  return [
    handType(hand),
    Array.from(hand).map((card) => map[card] || card),
  ]
}

const compareHands = (handA: string[], handB: string[]): number => {
  for (let i = 0; i < handA.length; i++) {
    if (handA[i] !== handB[i]) {
      return handA[i].localeCompare(handB[i]);
    }
  }
  return 0;
};

const sortPlays = (plays: Plays[]) => {
  return plays.sort((a, b) => {
    const [scoreA, handA] = strength(a.hand);
    const [scoreB, handB] = strength(b.hand);

    // sort by score 
    if (scoreA !== scoreB) {
      return scoreA - scoreB;
    }
    // if scores are equal sort by hand where 1...9...TJQKA
    return compareHands(handA, handB);
  }).map((play, idx) => ({
    ...play,
    rank: idx + 1,
  }));
}

const puzzle1 = (input: string) => {
  const plays = parseInput(input);
  const sorted = sortPlays(plays);
  return sorted.reduce((acc, curr) => acc + (curr.rank * curr.bid), 0);

};

console.log(puzzle1(input));

// const puzzle2 = (input: string) => {
//   const plays = parseInput(input);
//   const sorted = sortPlays(plays);
//   return sorted;
// };

// console.log(puzzle2(example1))