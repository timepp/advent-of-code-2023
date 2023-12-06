const data = ['a', 'b', 'a', 'c', 'd', 'e', 'f', 'b', 'c', 'a']
const counts = {} as Record<string, number>
for (const v of data) {
    counts[v] = (counts[v] || 0) + 1
}
console.log(counts)