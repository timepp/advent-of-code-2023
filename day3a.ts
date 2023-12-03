const data = Deno.readTextFileSync("./day3.txt").split(/\r?\n/).filter(l => l.length > 0)

function adjacentToSymbol(row: number, col: number, s: string) {
    for (let i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= data.length) continue
        const r = data[i]
        for (let j = col - 1; j <= col + s.length; j++) {
            if (j < 0 || j >= r.length) continue
            if ('0123456789.'.indexOf(r.charAt(j)) < 0) return true
        }
    }
    return false
}

let sum = 0
for (let i = 0; i < data.length; i++) {
    [...data[i].matchAll(/[0-9]+/g)].forEach(m => {
        if (adjacentToSymbol(i, m.index!, m[0])) {
            sum += Number(m[0])
        }
    })
}
console.log(sum)
// 539713