import { Command } from 'commander';
import fs from 'node:fs';
import { mkdirSync } from 'node:fs';

const program = new Command();

const getDay = async (day: number) => {
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
    const dir = `./dir/day_${day}`;
    mkdirSync(dir, { recursive: true });
    const inputExists = await Bun.file(`${dir}/day${day}Input.txt`).exists()
    if (inputExists) {
      throw new Error('This already exists!');
    }
    fs.writeFileSync(`${dir}/day${day}Input.txt`, input);
    fs.writeFileSync(`${dir}/day${day}Solution.ts`, './template.ts');
  } catch (error) {
    return error;
  }
}

getDay(Number(process.argv.slice(2)))