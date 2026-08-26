import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 16: aPaaS 云函数入口与元数据', async () => {
  const actual = await solve({
  "customerName": " 客户A ",
  "ownerId": 7
});
  assert.deepEqual(actual, {
  "name": "客户A",
  "ownerId": "7"
});
});
