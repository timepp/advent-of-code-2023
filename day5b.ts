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

// subtract range from a list of its sub ranges, resulting to a list of remaining ranges
function subtractRanges(r: number[], v: number[][]) {
    v.sort((a, b) => a[0] - b[0])
    const arr = [r[0], ...v.flat(), r[1]]
    return arr.map((v, i) => i % 2 === 0? [v, arr[i + 1]]: [0, 0]).filter(r => r[0] < r[1])
}

// map a range, resulting to a list of ranges
function mapRange(m: number[][], r: number[]) {
    const consumed = []
    const result = []
    for (const v of m) {
        const s = Math.max(v[1], r[0])
        const e = Math.min(v[1] + v[2], r[1])
        if (s < e) {
            consumed.push([s, e])
            result.push([v[0] + s - v[1], v[0] + e - v[1]])
        }
    }
    return [...result, ...subtractRanges(r, consumed)]
}

function mapRanges(m: number[][], r: number[][]) {
    return r.map(v => mapRange(m, v)).flat()
}

const minLocations = []
for (let i = 0; i < seeds.length; i += 2) {
    let r = [[seeds[i], seeds[i] + seeds[i + 1]]]
    for (const m of maps) {
        r = mapRanges(m, r)
    }
    minLocations.push(r.reduce((p, v) => Math.min(p, v[0]), Infinity))
}

console.log(Math.min(...minLocations))
// 12634632