import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 28: OIDC/JWT、RBAC、OpenAPI 与演进', async () => {
  const actual = await solve({
  "claims": {
    "iss": "idp",
    "aud": "crm",
    "exp": 200
  },
  "now": 100,
  "issuer": "idp",
  "audience": "crm"
});
  assert.deepEqual(actual, true);
});
