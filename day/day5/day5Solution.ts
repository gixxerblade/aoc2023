import fs from 'node:fs';
import { resolve } from 'node:path';

interface SeedMap {
  destination: number,
  range: number,
  source: number,
}

interface SeedData {
  // seeds: number[];
  'seed-to-soil': SeedMap[];
  'soil-to-fertilizer': SeedMap[];
  'fertilizer-to-water': SeedMap[];
  'water-to-light': SeedMap[];
  'light-to-temperature': SeedMap[];
  'temperature-to-humidity': SeedMap[];
  'humidity-to-location': SeedMap[];
}

const example1 = fs.readFileSync(resolve('example1.txt'), 'utf-8');
const example2 = fs.readFileSync(resolve('example2.txt'), 'utf-8');
const input = fs.readFileSync(resolve('day5Input.txt'), 'utf-8');

const splitLines = (text: string): string[] => {
  return text.split(/\r?\n/);
}

const parseInput = (input: string) => {
  const [seedData, ...rest] = input
    .split('\n\n')
    .filter((line) => line.trim() !== '');
  const seeds = seedData.split(':')[1].split(' ').map(Number).filter(Boolean);
  const mappings = rest.map((line) => {
    const nums = line.split('map:\n')[1];
    return nums.split('\n').map((num) => {
      const [dest, source, len] = num.split(' ').map(Number);
      return { dest, source, len };
    });
  })
  return { seeds, mappings };
}

const puzzle1 = (input: string) => {
  let { seeds, mappings } = parseInput(input);
  mappings.forEach((map) => {
    const result: number[] = [];
    seeds.forEach((seed) => {
      let hasMatch: boolean = false;
      for (const { dest, source, len } of map) {
        if (source <= seed && seed < (source + len)) {
          result.push(seed - source + dest);
          hasMatch = true;
        }
      }
      if (!hasMatch) {
        result.push(seed)
      }
    });
    seeds = result
  });
  return Math.min(...seeds);
};

const puzzle2 = (input: string) => { };

console.log(puzzle1(example1));
