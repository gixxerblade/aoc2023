import fs from 'node:fs';
import { resolve } from 'node:path';

const example1 = fs.readFileSync(resolve('example1.txt'), 'utf-8');
const input = fs.readFileSync(resolve('input.txt'), 'utf-8');

const parseInput = (input: string) => {
  return input
    .split('\n')
    .filter((line) => line.trim() !== '')
}

const puzzle1 = (input: string) => { };

const puzzle2 = (input: string) => { };
