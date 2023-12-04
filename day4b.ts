const input = Deno.readTextFileSync("./day4.txt").split(/\r?\n/).filter(l => l.length > 0)
const data = input.map(s => s.split(':')[1].split('|').map(nl => nl.trim().split(/\s+/).map(s => Number(s.trim()))))
const scores = data.map(_v => 1)
for (let i = 0; i < data.length; i++) {
    const [winningNumber, numbers] = data[i]
    const matched = numbers.filter(n => winningNumber.indexOf(n) >= 0).length
    for (let j = 0; j < matched; j++) {
        if (i + 1 + j < scores.length) {
            scores[i + 1 + j] += scores[i]
        }
    }
}
console.log(scores.reduce((a, b) => a + b, 0))
//8736438