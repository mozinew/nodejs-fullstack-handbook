import test from 'node:test';
import assert from 'node:assert/strict';
import { solve } from './index.js';

test('week 24: aPaaS 组件、AntD、ECharts 与联调', async () => {
  const actual = await solve([
  [
    "A",
    "A1"
  ],
  [
    "A",
    "A2"
  ]
]);
  assert.deepEqual(actual, [
  {
    "value": "A",
    "label": "A",
    "children": [
      {
        "value": "A1",
        "label": "A1",
        "children": []
      },
      {
        "value": "A2",
        "label": "A2",
        "children": []
      }
    ]
  }
]);
});
