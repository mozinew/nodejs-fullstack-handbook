import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 27: PostgreSQL、Prisma、事务与迁移', async () => {
  const actual = await solve({
  "id": "c1"
});
  assert.deepEqual(actual, [
  {
    "op": "insertCustomer",
    "id": "c1"
  },
  {
    "op": "insertOutbox",
    "key": "customer:c1:created"
  }
]);
});
