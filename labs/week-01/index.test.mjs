import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 01: 环境、REPL 与第一个程序', async () => {
  const actual = await solve("  Ontic   CRM  ");
  assert.deepEqual(actual, "Ontic CRM");
});
