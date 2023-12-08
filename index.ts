import { Command } from 'commander';
import fs from 'node:fs';
import { mkdirSync } from 'node:fs';

const program = new Command();

const getDay = async (day: number) => {
  const today = new Date().getDate();
  if (isNaN(day) || !day) {
    throw Error('Error', { cause: isNaN(day) ? `${day} is not a number` : 'Argument missing' })
  }
  const url = `https://adventofcode.com/2023/day/${day}/input`;
  try {
  const res = await fetch(url, {
      headers: { 
        Cookie: `session=${process.env.COOKIE}`,
    }});
    const input = await res.text();
    const dayDir = `./day/day${day}`;
    mkdirSync(dayDir, { recursive: true });
    const inputExists = await Bun.file(`${dayDir}/input.txt`).exists();
    if (inputExists) {
      throw new Error('This already exists!');
    }
    fs.writeFileSync(`${dayDir}/input.txt`, input);
    fs.writeFileSync(`${dayDir}/example1.txt`, '');
    fs.writeFileSync(`${dayDir}/example2.txt`, '');
    fs.copyFileSync('./template.ts', `${dayDir}/day${day}Solution.ts`);
  } catch (error) {
    return error;
  }
}

getDay(Number(process.argv.slice(2)))