import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 23: React 数据请求、竞态与测试', async () => {
  const actual = await solve([
  {
    "requestId": 2,
    "data": "new"
  },
  {
    "requestId": 1,
    "data": "old"
  }
]);
  assert.deepEqual(actual, "new");
});
