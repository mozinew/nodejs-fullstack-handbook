export function solve(n) { let value=0; const next=()=>++value; return Array.from({length:n},next); }
