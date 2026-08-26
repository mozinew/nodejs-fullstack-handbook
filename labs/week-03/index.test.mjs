import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 03: 函数、对象、数组与数据管道', async () => {
  const actual = await solve([
  {
    "region": "北区",
    "amount": "10"
  },
  {
    "region": "北区",
    "amount": 5
  },
  {
    "region": "南区",
    "amount": "x"
  }
]);
  assert.deepEqual(actual, {
  "北区": 15
});
});
