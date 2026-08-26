import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 04: 作用域、闭包、原型、class 与 this', async () => {
  const actual = await solve(4);
  assert.deepEqual(actual, [
  1,
  2,
  3,
  4
]);
});
