export function solve(rows) { return rows.filter(r=>Number.isFinite(Number(r.amount))).reduce((a,r)=>{a[r.region]=(a[r.region]??0)+Number(r.amount);return a;},{}); }
