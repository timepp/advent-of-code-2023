const data = Deno.readTextFileSync("./day14.txt").split(/\r?\n/).filter(l => l.length > 0).map(l => l.split(''))

function tiltN(data: string[][]) {
    const ret = data.map(l => l.map(c => c))
    for (let i = 0; i < data[0].length; i++) {
        for (let j = 0, k = j; j < data.length; j++) {
            if (data[j][i] === 'O') {
                ret[j][i] = '.'
                ret[k][i] = 'O'
                k++
            } else if (data[j][i] === '#') {
                k = j + 1
            }
        }
    }
    return ret
}

function tiltS(data: string[][]) {
    const ret = data.map(l => l.map(c => c))
    for (let i = 0; i < data[0].length; i++) {
        for (let j = data.length - 1, k = j; j >= 0; j--) {
            if (data[j][i] === 'O') {
                ret[j][i] = '.'
                ret[k][i] = 'O'
                k--
            } else if (data[j][i] === '#') {
                k = j - 1
            }
        }
    }
    return ret
}

function tiltW(data: string[][]) {
    const ret = data.map(l => l.map(c => c))
    for (let i = 0; i < data.length; i++) {
        for (let j = 0, k = j; j < data[0].length; j++) {
            if (data[i][j] === 'O') {
                ret[i][j] = '.'
                ret[i][k] = 'O'
                k++
            } else if (data[i][j] === '#') {
                k = j + 1
            }
        }
    }
    return ret
}

function tiltE(data: string[][]) {
    const ret = data.map(l => l.map(c => c))
    for (let i = 0; i < data.length; i++) {
        for (let j = data[0].length - 1, k = j; j >= 0; j--) {
            if (data[i][j] === 'O') {
                ret[i][j] = '.'
                ret[i][k] = 'O'
                k--
            } else if (data[i][j] === '#') {
                k = j - 1
            }
        }
    }
    return ret
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

const history: string[][][] = [data]
for (let i = 0; ; i++) {
    const ret = tiltE(tiltS(tiltW(tiltN((history[history.length - 1])))))
    const index = history.findIndex(h => compare(h, ret))
    if (index !== -1) {
        const final = (1000000000 - index) % (history.length - index) + index
        console.log(getLoad(history[final]))
        break
    }
    history.push(ret)
}
//96447