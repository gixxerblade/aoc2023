import { existsSync, statSync } from 'node:fs';
import { execSync } from "node:child_process";
import { Command } from 'commander';

const program = new Command();

program
  .requiredOption('-d --day <day_number>', 'Specify the day number', parseInt)
  .option('-l, --less', 'Run less mode');

program.parse(process.argv);

const options = program.opts(); 

const dayNum = options.day;
const directory = `./day/day${dayNum}`;

if (!existsSync(directory) || !statSync(directory).isDirectory()) {
  console.error(`Directory ${directory} not found.`);
  process.exit(1);
}

if (options.less) {
  console.log("Running in less mode.");
}


execSync(`cd ${directory} && bun run day${dayNum}Solution.ts ${options.less && '| less'}`, { stdio: "inherit" });
