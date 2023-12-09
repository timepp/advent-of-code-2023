type AxisRotation = {
    axis: number[]
    angle: number
}

function normalize(v: number[]) {
    const len = Math.sqrt(v.reduce((acc, v) => acc + v * v, 0))
    return v.map(v => v / len)
}

function axisRotationFromRotationMatrix(matrix: number[]): AxisRotation {
    const [m00, m01, m02, m10, m11, m12, m20, m21, m22] = matrix
    const angle = Math.acos((m00 + m11 + m22 - 1) / 2)
    const x = (m21 - m12) / (2 * Math.sin(angle))
    const y = (m02 - m20) / (2 * Math.sin(angle))
    const z = (m10 - m01) / (2 * Math.sin(angle))
    return { axis: [x, y, z], angle }
}

function rotationMatrixFromAxisRotation(ar: AxisRotation) {
    const [x, y, z] = ar.axis
    const c = Math.cos(ar.angle)
    const s = Math.sin(ar.angle)
    const t = 1 - c
    return [x*x*t+c, x*y*t-z*s, x*z*t+y*s,
            y*x*t+z*s, y*y*t+c, y*z*t-x*s,
            z*x*t-y*s, z*y*t+x*s, z*z*t+c]
}

function multiplyMatrix(m1: number[], m2: number[]) {
    const [a00, a01, a02, a10, a11, a12, a20, a21, a22] = m1
    const [b00, b01, b02, b10, b11, b12, b20, b21, b22] = m2
    return [
        a00*b00+a01*b10+a02*b20, a00*b01+a01*b11+a02*b21, a00*b02+a01*b12+a02*b22,
        a10*b00+a10*b10+a12*b20, a10*b01+a11*b11+a12*b21, a10*b02+a11*b12+a12*b22,
        a20*b00+a20*b10+a22*b20, a20*b01+a21*b11+a22*b21, a20*b02+a21*b12+a22*b22]
}
function radianFromDegree(d: number) {
    return d * Math.PI / 180
}
function degreeFromRadian(r: number) {
    return r * 180 / Math.PI
}

function multiplyAxisRotation(ars: AxisRotation[]) {
    const m = ars.reduce((acc, ar) => {
        const m = rotationMatrixFromAxisRotation(ar)
        return multiplyMatrix(m, acc)
    }, [1, 0, 0, 0, 1, 0, 0, 0, 1])
    return axisRotationFromRotationMatrix(m)
}

function log(ar: AxisRotation) {
    const d = degreeFromRadian(ar.angle)
    const round = (v: number) => Math.round(v * 1000000) / 1000000
    const normalized = normalize(ar.axis)
    console.log(`axis: [${normalized.map(round).join(', ')}], angle: ${round(d)}`)
}

log(multiplyAxisRotation([
    { axis: [1, 0, 0], angle: radianFromDegree(90) },
    // { axis: [0, 0, 1], angle: radianFromDegree(90) },
    { axis: [1, 0, 0], angle: radianFromDegree(90) },
    // { axis: [0, 0, 1], angle: radianFromDegree(90) },
    { axis: [0, 1, 0], angle: radianFromDegree(90) },
]))
