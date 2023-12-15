const data = Deno.readTextFileSync("./day14.txt").split(/\r?\n/).filter(l => l.length > 0).map(l => l.split(''))

function tilt(rows: number, cols: number, 
    get: (i: number, j: number) => string, set: (i: number, j: number, c: string) => void) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0, k = j; j < cols; j++) {
            if (get(i, j) === 'O') {
                set(i, j, '.')
                set(i, k, 'O')
                k++
            } else if (get(i, j) === '#') {
                k = j + 1
            }
        }
    }
}

function compare(data1: string[][], data2: string[][]) {
    return data1.every((l, i) => l.every((c, j) => c === data2[i][j]))
}

function getLoad(data: string[][]) {
    let sum = 0
    for (let i = 0; i < data[0].length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (data[j][i] === 'O') {
                sum += data.length - j
            }
        }
    }
    return sum
}

function cycle(data: string[][]) {
    const [rows, cols] = [data.length, data[0].length]
    tilt(cols, rows, (i, j) => data[j][i], (i, j, c) => data[j][i] = c) // N
    tilt(rows, cols, (i, j) => data[i][j], (i, j, c) => data[i][j] = c) // W
    tilt(cols, rows, (i, j) => data[rows-1-j][i], (i, j, c) => data[rows-1-j][i] = c) // S
    tilt(rows, cols, (i, j) => data[i][cols-1-j], (i, j, c) => data[i][cols-1-j] = c) // E
}

const history: string[][][] = [data]
for (let i = 0; ; i++) {
    const next = history[history.length-1].map(l => l.map(c => c))
    cycle(next)
    const index = history.findIndex(h => compare(h, next))
    if (index !== -1) {
        const final = (1000000000 - index) % (history.length - index) + index
        console.log(getLoad(history[final]))
        break
    }
    history.push(next)
}
//96447