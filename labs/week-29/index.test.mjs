import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 29: Redis 缓存、限流与一致性', async () => {
  const actual = await solve({
  "tenant": "t1",
  "resource": "products",
  "version": "v2"
});
  assert.deepEqual(actual, "crm:t1:products:v2");
});
