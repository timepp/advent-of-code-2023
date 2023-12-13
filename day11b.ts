const lines = Deno.readTextFileSync("./day11.txt").split(/\r?\n/).filter(l => l.length > 0)
const data = lines
const iset = new Set(data.keys())
const jset = new Set([...data[0]].keys())

const galaxies = []
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] === "#") {
            galaxies.push([i, j])
            iset.delete(i)
            jset.delete(j)
        }
    }
}

for (const i of [...iset].reverse()) {
    galaxies.forEach(v => v[0] += v[0] > i? 999999 : 0)
}
for (const j of [...jset].reverse()) {
    galaxies.forEach(v => v[1] += v[1] > j? 999999 : 0)
}

let sum = 0
for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        sum += Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1])
    }
}

console.log(sum)
console.log(iset, jset)
//842645913794