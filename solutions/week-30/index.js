export function solve({attempt,base=1000,max=30000}) { return Math.min(max,base*(2**Math.max(0,attempt-1))); }
