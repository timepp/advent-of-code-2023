# Keep track of advent of code 2023

All using typescript and executing with [deno](https://deno.land/)

I feel it's a pleasure to challenge myself with as less as code (while, still in good readability) to solve the problem.

## javascript sweet tricks I learned/used during the coding

### keeping a single non zero digit (n < 100)

```typescript
n % 10 || n / 10
```

### clean ways to get the integral part of a/b

```typescript
~~(a/b)
```

### single line: automatically init properties when it doesn't exist

use `??=`:

`(object[key]??=[]).push(3)`;

See examples in day3b

```typescript
const gearedNumbers: {[id:string]:number[]} = {}
......
            if (r.charAt(j) === '*') {
                (gearedNumbers[`gear_${i}_${j}`] ??= []).push(n)
            }
```
