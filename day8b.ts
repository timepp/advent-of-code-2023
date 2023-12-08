const lines = Deno.readTextFileSync("./day8.txt").split(/\r?\n/).filter(l => l.length > 0)
const instruction = [...lines[0]]
const network = lines.slice(1).map(l => l.split(/[^0-9A-Z]+/g).slice(0, 3))
const nodes = network.filter(n => n[0].endsWith('A')).map(n => n[0])
const steps = nodes.map(node => {
    let steps = 0
    while (!node.endsWith('Z')) {
        const dir = instruction[steps++ % instruction.length]
        const n = network.find(n => n[0] === node)!
        node = dir === 'L'? n[1] : n[2]
    }
    return steps
})

function lcm(a: number, b: number) {
    const gcd = (a: number, b: number):number => b === 0 ? a : gcd(b, a % b)
    return a * b / gcd(a, b)
}
const total = steps.reduce((acc, v) => lcm(acc, v), 1)
console.log(total)
//15690466351717