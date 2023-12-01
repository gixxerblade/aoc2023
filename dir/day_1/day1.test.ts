import { expect, test } from "bun:test";
import { mapWordToNum } from './day1Solution';


test.each([
  ['two1nine', 219],
  ['eightwothree', 823],
  ['abcone2threexyz', 23],
  ['xtwone3four', 2134],
  ['4nineeightseven2', 49872],
  ['zoneight234', 18234],
  ['7pqrstsixteen', 76],
  ])('%s should return %s', (input, result) => {
    const { res } = mapWordToNum(input);
    expect(+res).toBe(result);
  })