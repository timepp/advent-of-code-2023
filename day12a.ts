const lines = Deno.readTextFileSync("./day12.txt").split(/\r?\n/).filter(l => l.length > 0)
const data = lines.map(l => l.split(' ')).map(v => [v[0], v[1].split(',').map(Number)] as [string, number[]])

function getResolveCount(s: string, pos: number, sizes: number[]) {
    if (sizes.length === 0) {
        return s.indexOf('#', pos) === -1 ? 1 : 0
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
    return sum
}

let sum = 0
for (const [record, sizes] of data) {
    const c = getResolveCount(record, 0, sizes)
    console.log(record, sizes, c)
    sum += c
}

console.log(sum)
//7622