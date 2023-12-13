const lines = Deno.readTextFileSync("./day12.txt").split(/\r?\n/).filter(l => l.length > 0)
const data = lines.map(l => l.split(' ')).map(v => 
    [[v[0], v[0], v[0], v[0], v[0]].join('?'), ([v[1], v[1], v[1], v[1], v[1]].join(',')).split(',').map(Number)] as [string, number[]])

const memo = new Map<string, number>()

function getResolveCount(s: string, pos: number, sizes: number[]) {
    const key = [pos, sizes.length].join(',')
    if (memo.has(key)) return memo.get(key)!

    if (sizes.length === 0) {
        const r = s.indexOf('#', pos) === -1 ? 1 : 0
        memo.set(key, r)
        return r
    }

    const minimalLength = sizes.reduce((a, b) => a + b, 0) + sizes.length - 1
    const maxPos = s.length - minimalLength

    let sum = 0
    const currentSize = sizes[0]
    const nextSizes = sizes.slice(1)
    // check currentSize
    for (let i = pos; i <= maxPos; i++) {
        let meet = true
        for (let j = i; j < i + currentSize; j++) {
            if (s[j] === '.') {
                meet = false
                break
            }
        }
        if (s[i + currentSize] === '#') meet = false
        if (meet) {
            sum += getResolveCount(s, i + currentSize + 1, nextSizes)
        }
        // # means we are fixed, we can never move forward
        if (s[i] === '#') break;
    }
    memo.set(key, sum)
    return sum
}

let sum = 0
for (const [record, sizes] of data) {
    memo.clear()
    sum += getResolveCount(record, 0, sizes)
}

console.log(sum)
//4964259839627