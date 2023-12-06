const input = Deno.readTextFileSync("./day5.txt").split(/\r?\n/).filter(l => l.length > 0)
const seeds = input[0].split(':')[1].trim().split(/\s+/).map(Number)
const maps: number[][][] = []
for (const l of input.slice(1)) {
    if (l.endsWith('map:')) {
        maps.push([])
    } else {
        maps.at(-1)!.push(l.split(/\s+/).map(Number))
    }
}

function mapRange(m: number[][], range: number[]) {
    const points = [-Infinity, ...m.map(v => [v[1], v[1] + v[2]]).flat(), Infinity]
    const result = []
    for (let i = 0; i < points.length - 1; i++) {
        const s = Math.max(points[i], range[0])
        const e = Math.min(points[i + 1], range[1])
        if (s >= e) continue
        const [to, from] = i % 2 === 0? [0, 0] : m[~~(i/2)] // trivial mapping range if i is even
        result.push([s + to - from, e + to - from])
    }
    return result
}

function mapRanges(m: number[][], ranges: number[][]) {
    return ranges.map(r => mapRange(m, r)).flat()
}

const minLocations = []
maps.forEach(m => m.sort((a, b) => a[1] - b[1]))
for (let i = 0; i < seeds.length; i += 2) {
    let r = [[seeds[i], seeds[i] + seeds[i + 1]]]
    for (const m of maps) {
        r = mapRanges(m, r)
    }
    minLocations.push(r.reduce((p, v) => Math.min(p, v[0]), Infinity))
}

console.log(Math.min(...minLocations))
// 12634632