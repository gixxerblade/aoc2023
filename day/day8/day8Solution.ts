import fs from 'node:fs';
import { resolve } from 'node:path';

const example1 = fs.readFileSync(resolve('example1.txt'), 'utf-8');
const example2 = fs.readFileSync(resolve('example2.txt'), 'utf-8');
const input = fs.readFileSync(resolve('input.txt'), 'utf-8');

const parseInput = (input: string) => {
  const [steps, ...rest] = input.split('\n\n')
    .filter((line) => line.trim() !== '');
  const line = rest.map((line) => line)[0];
  const network: Record<string, string[]> = {}
  line.split('\n').forEach((l) => {
    const [node, target] = l.split(' = ');
    const re = new RegExp(/[()]/, 'g');
    network[node] = target?.replace(re, '').split(', ');
  })
  return { steps, network }
}
const puzzle1 = (input: string) => {
  let { steps, network } = parseInput(input);
  let count = 0;
  let curr = 'AAA';
  while (curr !== 'ZZZ') {
    count++;
    curr = steps[0] === 'L' ? network[curr][0] : network[curr][1];
    let chars = steps.split('');
    const shifted = chars.shift();
    chars.push(shifted!);
    steps = chars.join('');
  }
  return count;
};

const puzzle2 = (input: string) => { };

console.log(puzzle1(input));