const lines = Deno.readTextFileSync("./day1.txt").split(/\r?\n/).filter(l => l.length > 0)
const numbers = 'one 1 two 2 three 3 four 4 five 5 six 6 seven 7 eight 8 nine 9'.split(' ')
function getNumber(line: string) {
    const a1 = numbers.map(n => line.indexOf(n)).map(i => i === -1 ? Infinity : i)
    const a2 = numbers.map(n => line.lastIndexOf(n))
    const n1 = a1.indexOf(Math.min(...a1)) + 2 >> 1
    const n2 = a2.indexOf(Math.max(...a2)) + 2 >> 1
    return n1 * 10 + n2
}
const sum = lines.map(getNumber).reduce((a, b) => a + b, 0)
console.log(sum)
// 54676