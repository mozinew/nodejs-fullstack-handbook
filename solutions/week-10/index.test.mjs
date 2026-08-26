import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 10: Buffer、Stream、EventEmitter 与背压', async () => {
  const actual = await solve("CRM客户");
  assert.deepEqual(actual, 9);
});
