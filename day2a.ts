const lines = Deno.readTextFileSync("./day2.txt").split(/\r?\n/).filter(l => l.length > 0)
const data = lines.map(l => {
    const sets = l.split(':')[1].split(';').map(s => {
        const cubes = {red: 0, green: 0, blue: 0}
        for (const conf of s.split(',')) {
            const [count, color] = conf.trim().split(' ')
            cubes[color as keyof typeof cubes] = Number(count)
        }
        return cubes
    })
    return sets
})

let sum = 0
for (let i = 0; i < data.length; i++) {
    if (!data[i].find(c => c.red > 12 || c.green > 13 || c.blue > 14)) {
        sum += i+1
    }
}
console.log(sum)
// 2085