import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 20: 连接器、身份与跨系统一致性', async () => {
  const actual = await solve({
  "state": "sending",
  "event": "fail"
});
  assert.deepEqual(actual, "retry");
});
