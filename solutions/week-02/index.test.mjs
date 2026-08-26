import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 02: 值、类型、变量与控制流', async () => {
  const actual = await solve([
  "a",
  1,
  true,
  null,
  {}
]);
  assert.deepEqual(actual, {
  "string": 1,
  "number": 1,
  "boolean": 1,
  "null": 1,
  "object": 1
});
});
