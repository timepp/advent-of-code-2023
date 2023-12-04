const input = Deno.readTextFileSync("./day4.txt").split(/\r?\n/).filter(l => l.length > 0)
const data = input.map(s => s.split(':')[1].split('|').map(nl => nl.trim().split(/\s+/).map(Number)))
const scores = data.map(c => ~~(2 ** (c[1].filter(n => c[0].indexOf(n) >= 0).length - 1)))
const sum = scores.reduce((a, b) => a + b, 0)
console.log(sum)
//24542