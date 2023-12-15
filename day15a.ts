const data = Deno.readTextFileSync("./day15.txt").split(/\r?\n/)[0].split(',')
function hash(s: string) {
    return s.split('').reduce((a, c) => (a + c.charCodeAt(0)) * 17 % 256, 0)
}
const sum = data.reduce((a, c) => a + hash(c), 0)
console.log(sum)
//96447