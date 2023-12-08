const lines = Deno.readTextFileSync("./day8.txt").split(/\r?\n/).filter(l => l.length > 0)
const instruction = [...lines[0]]
const network = lines.slice(1).map(l => l.split(/[^A-Z]+/g).slice(0, 3))
let node = 'AAA'
let steps = 0
while (node !== 'ZZZ') {
    const dir = instruction[steps++ % instruction.length]
    const n = network.find(n => n[0] === node)!
    node = dir === 'L'? n[1] : n[2]
}
console.log(steps)
//20659