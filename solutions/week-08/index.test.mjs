import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 08: 并发限制、取消、超时与重试', async () => {
  const actual = await solve({
  "items": [
    1,
    2,
    3,
    4,
    5
  ],
  "size": 2
});
  assert.deepEqual(actual, [
  [
    1,
    2
  ],
  [
    3,
    4
  ],
  [
    5
  ]
]);
});
