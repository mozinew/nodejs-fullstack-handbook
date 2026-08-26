export function solve({from,to}) { const major=s=>Number(/^v?(\d+)/.exec(s)?.[1]); return major(from)!==major(to); }
