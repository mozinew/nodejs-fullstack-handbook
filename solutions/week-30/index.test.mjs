import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 30: BullMQ、消息、Outbox 与可靠消费', async () => {
  const actual = await solve({
  "attempt": 6,
  "base": 1000,
  "max": 30000
});
  assert.deepEqual(actual, 30000);
});
