const lines = Deno.readTextFileSync("./day10.txt").split(/\r?\n/).filter(l => l.length > 0)
const data = lines
const map = data.map(l => new Array<number>(l.length).fill(-1))

function findStartPoint() {
    for (let i = 0; i < data.length; i++) {
        const j = data[i].indexOf('S')
        if (j >= 0) return {i, j}
    }
    throw new Error('unreachable')
}

function getConnections([i, j]: number[]) {
    return [
        '|LJS'.includes(data[i][j]) && i > 0 && '|7FS'.includes(data[i-1][j])? [i-1, j] : [],
        '|7FS'.includes(data[i][j]) && i < data.length - 1 && '|LJS'.includes(data[i+1][j])? [i+1, j] : [],
        '-J7S'.includes(data[i][j]) && j > 0 && '-LFS'.includes(data[i][j-1])? [i, j-1] : [],
        '-LFS'.includes(data[i][j]) && j < data[i].length - 1 && '-J7S'.includes(data[i][j+1])? [i, j+1] : [],
    ]
}

const start = findStartPoint()
map[start.i][start.j] = 0
let distance = 0
const border = [[start.i, start.j]]
while (border.length > 0) {
    const [i0, j0] = border.shift()!
    const conn = getConnections([i0, j0]).filter(v => v.length > 0)
    for (const [i, j] of conn) {
        if (map[i][j] < 0) {
            distance = map[i0][j0] + 1
            map[i][j] = distance
            border.push([i, j])
        }
    }
}

console.log(distance)
//6778