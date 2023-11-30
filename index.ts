import { Command } from 'commander';

const program = new Command();

const getDay = async (day: number) => {
  const today = new Date();
  const isDecember = new Date().getMonth() ===  11;
  if (isNaN(day) || !day) {
    throw Error('Error', { cause: isNaN(day) ? `${day} is not a number` : 'Argument missing' })
  }
  if (isDecember && day > today.getDate()) {
    throw new Error('Error', { cause: `${day} is greater than ${today}` });
  }
  if (isDecember && (day < 1 || day > 25)) {
    throw new Error('Error', { cause: `${day} cannot be less than 1 or greater than 25` });
  }
  const url = `https://adventofcode.com/2022/day/${day}/input`;
  try {
  const res = await fetch(url, {
      headers: { 
        Cookie: `session=${process.env.COOKIE}`,
    }});
    const input = await res.text();
    const dir = `./dir/day_${day}`;
    const inputPath = Bun.file(`${dir}/day${day}Input.txt`);
    const template = Bun.file(`day${day}Solution.ts`);
    const inputExists = await inputPath.exists();
    if (inputExists) {
      throw new Error('This already exists!');
    }
    const output = await Bun.write(inputPath, input);
    const tempOutput = await Bun.write(dir, template);
    console.log({ output, tempOutput })
  } catch (error) {
    return error;
  }
}

getDay(Number(process.argv.slice(2)))