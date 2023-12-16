const data = Deno.readTextFileSync("./day16.txt").split(/\r?\n/).filter((s) => s.length > 0)

function getEnergizes(startX: number, startY: number, dirs: number[]) {
    const stat = data.map(l => [...l].map(_c => [0,0,0,0])) // [0,0,0,0] = [l,r,u,d]
    stat[startX][startY] = dirs
    const border: [number, number][] = [[startX, startY]]
    while (border.length > 0) {
        const [x, y] = border.shift()!
        const [l, r, u, d] = stat[x][y]
        const c = data[x][y]
        if ((r && ".-".includes(c) || u && "/-".includes(c) || d && "\\-".includes(c)) && y < data[x].length - 1 && !stat[x][y+1][1]) {
            stat[x][y+1][1] = 1
            border.push([x, y+1])
        }
        if ((l && ".-".includes(c) || u && "\\-".includes(c) || d && "/-".includes(c)) && y > 0 && !stat[x][y-1][0]) {
            stat[x][y-1][0] = 1
            border.push([x, y-1])
        }
        if ((d && ".|".includes(c) || l && "/|".includes(c) || r && "\\|".includes(c)) && x < data.length - 1 && !stat[x+1][y][3]) {
            stat[x+1][y][3] = 1
            border.push([x+1, y])
        }
        if ((u && ".|".includes(c) || l && "\\|".includes(c) || r && "/|".includes(c)) && x > 0 && !stat[x-1][y][2]) {
            stat[x-1][y][2] = 1
            border.push([x-1, y])
        }
    }
    let sum = 0
    stat.forEach(l => l.forEach(c => sum += c.indexOf(1) >= 0 ? 1 : 0))
    return sum
}
const es = []
for (let i = 0; i < data.length; i++) {
    es.push(getEnergizes(i, 0, [0,1,0,0]))
    es.push(getEnergizes(i, data[i].length - 1, [1,0,0,0]))
}
for (let j = 0; j < data[0].length; j++) {
    es.push(getEnergizes(0, j, [0,0,0,1]))
    es.push(getEnergizes(data.length - 1, j, [0,0,1,0]))
}
console.log(Math.max(...es))
//7530