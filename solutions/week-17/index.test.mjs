import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 17: aPaaS 数据对象、字段与权限', async () => {
  const actual = await solve({
  "fields": [
    "name",
    "owner",
    "name"
  ],
  "allowed": [
    "name",
    "owner"
  ]
});
  assert.deepEqual(actual, [
  "name",
  "owner"
]);
});
