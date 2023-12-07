const lines = Deno.readTextFileSync("./day7.txt").split(/\r?\n/).filter(l => l.length > 0)
const adjustForOrdering = (s: string) => s.replaceAll('A', 'Z').replaceAll('K', 'Y').replaceAll('T', 'B').replaceAll('J', '1')
const data = lines.map(l => l.split(' ')).map(v => [adjustForOrdering(v[0]), Number(v[1])] as [string, number])

function getHandType(h: string) {
    const cardCounter: {[id: string]: number} = {}
    for (const c of h) {
        cardCounter[c] = (cardCounter[c] || 0) + 1
    }
    const arr = Object.values(cardCounter).sort((a, b) => b - a)
    // move all J to the largest except J
    const jCount = cardCounter['1'] || 0
    if (arr.length > 1 && jCount > 0) {
        arr.splice(arr.indexOf(jCount), 1)
        arr[0] += jCount
    }
    return arr.join('')
}

data.sort((a, b) => (getHandType(a[0]) + a[0]).localeCompare((getHandType(b[0]) + b[0])))
const score = data.reduce((acc, v, i) => acc + v[1] * (i + 1), 0)
console.log(score)
//251421071