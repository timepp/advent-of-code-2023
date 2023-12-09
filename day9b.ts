const lines = Deno.readTextFileSync("./day9.txt").split(/\r?\n/).filter(l => l.length > 0)
const data = lines.map(l => l.split(' ').map(Number))
// For [a1 .. an], the next number is (C(n, 1) * an - C(n, 2) * an-1 + ... + (-1)^n*C(n, n) * a1)
function C(m: number, n: number) {
    let result = 1
    for (let i = 1; i <= Math.min(n, m - n); i++) {
        result = result * (m - i + 1) / i
    }
    return result
}

let result = 0
for (const v of data) {
    result += v.reduce((acc, n, i) => acc + (-1)**i * C(v.length, i+1) * n, 0)
}
console.log(result)
//993