export function solve({claims,now,issuer,audience}) { return claims.iss===issuer && claims.aud===audience && Number(claims.exp)>now; }
