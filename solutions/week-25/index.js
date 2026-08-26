export function solve({repo,input}) { if(!input.name?.trim())throw new TypeError('NAME'); return repo.create({name:input.name.trim()}); }
