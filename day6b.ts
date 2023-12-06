const input = Deno.readTextFileSync("./day6.txt").split(/\r?\n/).filter(l => l.length > 0)
const [t, d] = input.map(l => l.split(':')[1].replaceAll(' ', '')).map(Number)
const integersWithinRange = (a: number, b: number) => Math.ceil(b-1) - Math.floor(a+1) + 1
// integers between roots of `x * (t-x) = d`
const v = Math.sqrt(t * t - 4 * d)
console.log(integersWithinRange((t-v)/2, (t+v)/2))
// 34934171