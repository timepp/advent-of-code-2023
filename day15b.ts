const data = Deno.readTextFileSync("./day15.txt").split(/\r?\n/)[0].split(',')
const hash = (s: string) => [...s].reduce((a, c) => (a + c.charCodeAt(0)) * 17 % 256, 0)
const boxes: {label: string, focal: string}[][] = []

for (const s of data) {
    const [label, focal] = s.split(/[-=]/)
    const index = hash(label)
    const box = boxes[index]??=[]
    const p = box.findIndex(v => v.label === label)
    if (!focal) {
        if (p !== -1) {
            box.splice(p, 1)
        }
    } else {
        if (p !== -1) {
            box[p].focal = focal
        } else {
            box.push({label, focal})
        }
    }
}

let sum = 0
boxes.forEach((box, i) => box.forEach((v, j) => {
    sum += (i+1) * (j+1) * Number(v.focal)
}))
console.log(sum)
//279116