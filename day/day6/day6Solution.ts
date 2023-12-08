import fs from 'node:fs';
import { resolve } from 'node:path';

const example1 = fs.readFileSync(resolve('example1.txt'), 'utf-8');
const input = fs.readFileSync(resolve('input.txt'), 'utf-8');

const zip = <T> (...arrays: T[][]) => {
  const maxLength = Math.max(...arrays.map((x) => x.length));
  return Array.from({ length: maxLength }).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
  });
};

const range = (range: number) => Array.from(Array(range).keys());

const parseFirstPart = (input: string) => {
  const [times, distances] = input
    .split('\n')
    .map((line) => {
      const parts = line.split(':');
      return parts[1]?.trim().split(/\s+/).map(Number);
    });
  return { times, distances }
}

const parseSecondPart = (input: string) => {
  const [times, distances] = input
    .split('\n')
    .map((line) => {
      const parts = line.split(':');
      return [parts[1]?.trim().split(/\s+/).join('')].map(Number);
    });
    return { times, distances };
}

const findMargin = (times: number[], distances: number[]) => {
  let result = 1;
  for (const [time, distance] of zip(times, distances)) {
    let margin = 0;
    for (const hold of range(time)) {
      if (hold * (time - hold) > distance) {
        margin += 1;
      }
    }
    result *= margin;
  }
  return result;
}

const puzzle1 = (input: string) => {
  const { times, distances } = parseFirstPart(input);
  return findMargin(times, distances);
};

const puzzle2 = (input: string) => {
  const { times, distances } = parseSecondPart(input);
  return findMargin(times, distances);
};

console.log(puzzle1(input));
console.log(puzzle2(input));
