import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 07: Promise、async/await 与事件循环', async () => {
  const actual = await solve([
  1,
  2,
  3
]);
  assert.deepEqual(actual, [
  2,
  4,
  6
]);
});
