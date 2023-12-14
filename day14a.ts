const data = Deno.readTextFileSync("./day14.txt").split(/\r?\n/).filter(l => l.length > 0)
let sum = 0
for (let i = 0; i < data[0].length; i++) {
    let currentLoad = data.length
    for (let j = 0; j < data.length; j++) {
        if (data[j][i] === 'O') {
            sum += currentLoad
            currentLoad--
        } else if (data[j][i] === '#') {
            currentLoad = data.length - j - 1
        }
    }
}
console.log(sum)
//108614