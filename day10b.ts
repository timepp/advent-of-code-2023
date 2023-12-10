const lines = Deno.readTextFileSync("./day10.txt").split(/\r?\n/).filter(l => l.length > 0)
const data = lines
const map = data.map(l => new Array<number>(l.length).fill(-1))

function findStartPoint() {
    for (let i = 0; i < data.length; i++) {
        const j = data[i].indexOf('S')
        if (j >= 0) return [i, j]
    }
    throw new Error('unreachable')
}

function getConnectDirection(s: string) {
    switch (s) {
        case '|': return [1, 1, 0, 0]
        case '-': return [0, 0, 1, 1]
        case 'L': return [1, 0, 0, 1]
        case 'J': return [1, 0, 1, 0]
        case '7': return [0, 1, 1, 0]
        case 'F': return [0, 1, 0, 1]
        case 'S': return [1, 1, 1, 1]
    }
    return []
}

function getConnections(i: number, j: number) {
    const dirs = getConnectDirection(data[i][j])
    const connections = []
    if (dirs[0] && i > 0 && getConnectDirection(data[i-1][j])[1]) connections.push([i-1, j])
    if (dirs[1] && i < data.length - 1 && getConnectDirection(data[i+1][j])[0]) connections.push([i+1, j])
    if (dirs[2] && j > 0 && getConnectDirection(data[i][j-1])[3]) connections.push([i, j-1])
    if (dirs[3] && j < data[i].length - 1 && getConnectDirection(data[i][j+1])[2]) connections.push([i, j+1])
    return connections
}

function getShapeByConnections(i: number, j: number) {
    const conn = getConnections(i, j)
    const cu = conn.find(v => v[0] < i)
    const cd = conn.find(v => v[0] > i)
    const cl = conn.find(v => v[1] < j)
    const cr = conn.find(v => v[1] > j)
    if (cu && cd) return '|'
    if (cl && cr) return '-'
    if (cu && cr) return 'L'
    if (cu && cl) return 'J'
    if (cd && cl) return '7'
    if (cd && cr) return 'F'
    throw new Error('unreachable')
}

const [i, j] = findStartPoint()
map[i][j] = 0
let distance = 0
let border = [[i, j]]
while (border.length > 0) {
    distance++
    const newBorder = []
    for (const [i, j] of border) {
        const conn = getConnections(i, j)
        for (const [i1, j1] of conn) {
            if (map[i1][j1] < 0) {
                map[i1][j1] = distance
                newBorder.push([i1, j1])
            }
        }
    }
    border = newBorder
}

let sum = 0
for (let i = 0; i < map.length; i++) {
    let wallCount = 0
    let horizontalWallFromU = false
    for (let j = 0; j < map[i].length; j++) {
        const s = data[i][j] === 'S'? getShapeByConnections(i, j) : data[i][j]
        if (map[i][j] >= 0) {
            if ('L|F'.includes(s)) {
                wallCount++
                horizontalWallFromU = s === 'L'
            }
            if (s === 'J' && horizontalWallFromU) wallCount++
            if (s === '7' && !horizontalWallFromU) wallCount++
        } else {
            // scan from left to right, we are inside only if we have crossed an odd number of walls (pipes)
            sum += wallCount % 2
        }
    }
}

console.log(sum)
//433