const patterns = Deno.readTextFileSync("./day13.txt").split(/\r?\n\r?\n/).map(l => l.split(/\r?\n/).filter(l => l.length > 0))

function findMirrorPosition(p: string[], horizontal: boolean) {
    const outerLength = horizontal? p.length : p[0].length
    const innerLength = horizontal? p[0].length : p.length
    const fetcher = (i: number, j: number) => horizontal? p[i][j] : p[j][i]
    for (let i = 1; i < outerLength; i++) {
        let match = true
        for (let j = i - 1, k = i; j >= 0 && k < outerLength; j--, k++) {
            for (let l = 0; l < innerLength; l++) {
                if (fetcher(j, l) !== fetcher(k, l)) {
                    match = false
                    break
                }
            }
        }
        if (match) return i
    }
    return 0
}

const sum = patterns.reduce((acc, p) => acc + findMirrorPosition(p, true) * 100 + findMirrorPosition(p, false), 0)
console.log(sum)
//33520