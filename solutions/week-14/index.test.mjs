import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 14: tsconfig、CJS/ESM、npm 与工程基线', async () => {
  const actual = await solve({
  "from": "1.4.0",
  "to": "2.0.0"
});
  assert.deepEqual(actual, true);
});
