export function solve(rows) { return rows.reduce((best,r)=>!best||r.requestId>best.requestId?r:best,null)?.data ?? null; }
