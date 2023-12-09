const lines = Deno.readTextFileSync("./day1s.txt").split(/\r?\n/).filter(l => l.length > 0)
const isDigit = (c: string) => c >= '0' && c <= '9'
const numbers = lines.map(l => Number([...l].find(isDigit)! + [...l].findLast(isDigit)!))
console.log(numbers.reduce((a, b) => a + b, 0))
// 53921