const lines = Deno.readTextFileSync("./day7.txt").split(/\r?\n/).filter(l => l.length > 0)
const adjustForOrdering = (s: string) => s.replaceAll('A', 'Z').replaceAll('K', 'Y').replaceAll('T', 'B')
const data = lines.map(l => l.split(' ')).map(v => [adjustForOrdering(v[0]), Number(v[1])] as [string, number])

// the pattern itself (e.g. 5 41 32 311...) can be used to determine the ordering, thus can be used as type
function getHandType(h: string) {
    const cardCounter: {[id: string]: number} = {}
    for (const c of h) {
        cardCounter[c] = (cardCounter[c] || 0) + 1
    }
    return Object.values(cardCounter).sort((a, b) => b - a).join('')
}

data.sort((a, b) => (getHandType(a[0]) + a[0]).localeCompare((getHandType(b[0]) + b[0])))
const score = data.reduce((acc, v, i) => acc + v[1] * (i + 1), 0)
console.log(score)
//251121738