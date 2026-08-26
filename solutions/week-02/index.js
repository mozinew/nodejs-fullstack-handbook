export function solve(input) { return input.reduce((r,v) => { const k = v === null ? 'null' : typeof v; r[k]=(r[k]??0)+1; return r; }, {}); }
