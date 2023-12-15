const data = Deno.readTextFileSync("./day15.txt").split(/\r?\n/)[0].split(',')
function hash(s: string) {
    return s.split('').reduce((a, c) => (a + c.charCodeAt(0)) * 17 % 256, 0)
}
const boxes = new Array(256) as {label: string, focal: number}[][]
for (let i = 0; i < 256; i++) {
    boxes[i] = []
}
for (const s of data) {
    if (s.endsWith('-')) {
        const label = s.slice(0, -1)
        const index = hash(label)
        const p = boxes[index].findIndex(v => v.label === label)
        if (p !== -1) {
            boxes[index].splice(p, 1)
        }
    } else {
        const arr = s.split('=')
        const [label, focal] = [arr[0], Number(arr[1])]
        const index = hash(label)
        const p = boxes[index].findIndex(v => v.label === label)
        if (p !== -1) {
            boxes[index][p].focal = focal
        } else {
            boxes[index].push({label, focal})
        }
    }
}

let sum = 0
for (let i = 0; i < 256; i++) {
    const box = boxes[i]
    for (let j = 0; j < box.length; j++) {
        sum += (i+1) * (j+1) * box[j].focal
    }
}
console.log(sum)
//96447