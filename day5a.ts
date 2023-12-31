const input = Deno.readTextFileSync("./day5.txt").split(/[^\n]+map:/).map(s => s.split(/\r?\n/).filter(l => l.length > 0))
const seeds = input[0][0].split(':')[1].trim().split(/\s+/).map(Number)
const maps = input.slice(1).map(m => m.map(l => l.split(/\s+/).map(Number)))
const locations = seeds.map(v => {
    for (const m of maps) {
        const r = m.find(r => v >= r[1] && v < r[1] + r[2])
        if (r) v = r[0] + v - r[1]
    }
    return v
})
console.log(Math.min(...locations))
// 51752125