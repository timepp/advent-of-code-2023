const input = Deno.readTextFileSync("./day6.txt").split(/\r?\n/).filter(l => l.length > 0)
const [times, distances] = input.map(l => l.split(':')[1].trim().split(/\s+/).map(Number))

let score = 1
const integersWithinRange = (a: number, b: number) => Math.ceil(b-1) - Math.floor(a+1) + 1
for (let i = 0; i < times.length; i++) {
    const t = times[i]
    const d = distances[i]
    // x * (t-x) > d
    const v = Math.sqrt(t * t - 4 * d)
    score *= integersWithinRange((t-v)/2, (t+v)/2)
}

console.log(score)
//71503