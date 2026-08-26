export function solve(p={}) { const name=String(p.name??p.customerName??'').trim(); if(!name) throw new TypeError('NAME_REQUIRED'); return {name,ownerId:String(p.ownerId??'').trim()}; }
