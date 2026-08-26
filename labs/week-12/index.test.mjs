import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 12: TypeScript 基础类型与运行时边界', async () => {
  const actual = await solve({
  "id": "c1",
  "name": "客户A"
});
  assert.deepEqual(actual, true);
});
