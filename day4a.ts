const input = Deno.readTextFileSync("./day4.txt").split(/\r?\n/).filter(l => l.length > 0)
let sum = 0
for (const s of input) {
    const card = s.split(':')[1].split('|').map(s => s.trim().split(/\s+/).map(Number))
    const matched = card[1].filter(n => card[0].indexOf(n) >= 0).length
    sum += matched? 2 ** (matched - 1) : 0
}
console.log(sum)
//24542