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

const powers = data.map(d => {
    const red = Math.max(...d.map(c => c.red))
    const green = Math.max(...d.map(c => c.green))
    const blue = Math.max(...d.map(c => c.blue))
    return red * green * blue
})

const sum = powers.reduce((a, b) => a + b, 0)
console.log(sum)
// 79315