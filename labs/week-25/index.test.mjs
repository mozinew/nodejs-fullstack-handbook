import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 25: NestJS 模块、Controller、Provider 与 DI', async () => {
  const actual = await solve({repo:{create:v=>({id:'c1',...v})},input:{name:' 客户A '}});
  assert.deepEqual(actual, {
  "id": "c1",
  "name": "客户A"
});
});
