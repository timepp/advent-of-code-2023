# Keep track of advent of code 2023

All using typescript and executing with [deno](https://deno.land/)
I feel it's pleasure to challenge myself with as less as code to solve the problem.

## javascript sweet tricks

### keeping a single non zero digit (n < 100)

```typescript
n % 10 || n / 10
```

### clean ways to get same result of `a/b` in C/C++

```typescript
~~(a/b)
```

### single line: automatically init properties when it doesn't exist

use `??=`:

`(object[key]??=[]).push(3)`; `(counter[key]??=0)++`

See examples in day3b

```typescript
const gearedNumbers: {[id:string]:number[]} = {}
......
            if (r.charAt(j) === '*') {
                (gearedNumbers[`gear_${i}_${j}`] ??= []).push(n)
            }
```