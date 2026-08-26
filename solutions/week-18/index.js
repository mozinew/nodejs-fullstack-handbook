export function solve({items,size}) { if(size<1)throw new TypeError('SIZE'); const out=[]; for(let i=0;i<items.length;i+=size)out.push({batch:i/size+1,items:items.slice(i,i+size)}); return out; }
