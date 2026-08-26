import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 18: 流式、批量、长任务与幂等', async () => {
  const actual = await solve({
  "items": [
    "a",
    "b",
    "c"
  ],
  "size": 2
});
  assert.deepEqual(actual, [
  {
    "batch": 1,
    "items": [
      "a",
      "b"
    ]
  },
  {
    "batch": 2,
    "items": [
      "c"
    ]
  }
]);
});
