import fs from 'node:fs';
import { resolve } from 'node:path';

const example = fs.readFileSync(resolve('example1.txt'), 'utf-8');
const input = fs.readFileSync(resolve('day2Input.txt'), 'utf-8');

interface Game {
  game: number,
  plays: { color: string, count: number }[][],
}

const parseInput = (input: string): Game[] => {
  return input
    .split('\n')
    .filter((line) => line.trim() !== '')
    .map((line) => {
      const [, game] = line.split(': ')[0].split(' ').map(Number);
      const plays = line.split(': ')[1].split('; ')
        .map((set) => set.split(', ').map((cubes) => {
          const [count, color] = cubes.split(' ');
          return { color, count: +count };
        }));

      return { game, plays };
    });
}

const isGamePossible = (game: Game) => {
  return game.plays.every((set) => set.every((cube) => {
    switch (cube.color) {
      case 'red':
        return cube.count <= 12
      case 'blue':
        return cube.count <= 14
      case 'green':
        return cube.count <= 13
    }
  }))
};

const getFewestNumberPossible = (game: Game) => {
  let redMin: number = 0;
  let blueMin: number = 0;
  let greenMin: number = 0;

  game.plays.forEach((play, idx) => {
    play.forEach(({ color, count }) => {
      switch (color) {
        case 'red':
          if (count > redMin) {
            redMin = count;
          }
          break;
        case 'blue':
          if (count > blueMin) {
            blueMin = count;
          }
          break;
        case 'green':
          if (count > greenMin) {
            greenMin = count;
          }
          break;
      }
    });
  });
  return { redMin, blueMin, greenMin };
}

const puzzlel = (input: string) => {
  return parseInput(input)
    .filter(isGamePossible)
    .reduce((acc, { game }) => acc + game, 0)
}

const puzzle2 = (input: string) => {
  return parseInput(input)
    .map(getFewestNumberPossible)
    .reduce((acc, { redMin, blueMin, greenMin }) => acc + (redMin * blueMin * greenMin), 0);

}

// console.log(puzzlel(input));
console.log(puzzle2(input));