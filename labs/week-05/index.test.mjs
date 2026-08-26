import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 05: Map、Set、迭代协议与错误模型', async () => {
  const actual = await solve([
  "u1",
  "u2",
  "u1",
  null,
  "u3"
]);
  assert.deepEqual(actual, [
  "u1",
  "u2",
  "u3"
]);
});
