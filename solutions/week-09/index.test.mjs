import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 09: fs、path、URL 与 process', async () => {
  const actual = await solve("createCustomer");
  assert.deepEqual(actual, "createCustomer");
});
