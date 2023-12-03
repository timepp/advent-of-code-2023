const data = Deno.readTextFileSync("./day3.txt").split(/\r?\n/).filter(l => l.length > 0)
const gearedNumbers: {[id:string]:number[]} = {}

function checkAdjacentToSymbol(row: number, col: number, s: string, n: number) {
    for (let i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= data.length) continue
        const r = data[i]
        for (let j = col - 1; j <= col + s.length; j++) {
            if (j < 0 || j >= r.length) continue
            if (r.charAt(j) === '*') {
                (gearedNumbers[`gear_${i}_${j}`] ??= []).push(n)
            }
        }
    }
    return false
}

for (let i = 0; i < data.length; i++) {
    [...data[i].matchAll(/[0-9]+/g)].forEach(m => {
        checkAdjacentToSymbol(i, m.index!, m[0], Number(m[0]))
    })
}
const sum = Object.values(gearedNumbers)
    .map(arr => arr.length === 2? arr[0] * arr[1] : 0)
    .reduce((a, b) => a + b, 0)

console.log(sum)
// 84159075