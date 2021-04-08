import {det,round,lusolve,subtract,multiply,transpose,add} from "mathjs"
import rref from 'rref'
import linSystem from 'linear-equation-system'
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export const Cramer = async(req,res) => {
    const data = req.body
    let result = []
const m = [
    [data.a1, data.a2,data.a3],
    [data.a4, data.a5, data.a6],
    [data.a7, data.a8, data.a9],
]
const b = [data.b1, data.b2, data.b3]

const cal = (i, j) => {
    const a1 = [
        [data.a1, data.a2,data.a3],
        [data.a4, data.a5, data.a6],
        [data.a7, data.a8, data.a9],
    ]
    while (i < b.length) {
        a1[i][j] = b[i]
        i++
    }
    return det(a1) / det(m)
}
for (let i = 0; i < m.length; i++) {
    let ans = (round(cal(0, i)))
    result.push({x: i + 1,ans})
}
res.json({data: result})
}

export const GaussElimination = (req, res) => {
    const data = req.body
    let result = []
    const x = rref([
        [data.a1, data.a2, data.a3, data.b1],
        [data.a4, data.a5, data.a6, data.b2],
        [data.a7, data.a8, data.a9, data.b3],
    ])

    for (let i = 0; i < x.length; i++) {
        let ans = round(x[i][x.length])
        result.push({ x: i + 1, ans })
    }
    res.json({
        data: result,
    })
}

export const GaussJordan = (req, res) => {
    const data = req.body
    let result = []
    const a = [
        [data.a1, data.a2, data.a3],
        [data.a4, data.a5, data.a6],
        [data.a7, data.a8, data.a9],
    ]
    const b = [data.b1, data.b2, data.b3]
    let x = round(linSystem.solve(a, b))
    for (let i = 0; i < x.length; i++) {
        result.push({ xi: i + 1, ans: x[i] })
    }
    res.json({
        data: result,
    })
}

export const LUdecomposition = (req, res) => {
    const data = req.body
    let result = []
    const a = [
        [data.a1, data.a2, data.a3],
        [data.a4, data.a5, data.a6],
        [data.a7, data.a8, data.a9],
    ]
    const b = [data.b1, data.b2, data.b3]
    const ans = lusolve(a, b)
    let x = round(ans)
    for (let i = 0; i < x.length; i++) {
        result.push({ xi: i + 1, ans: x[i][0] })
    }
    res.json({
        data: result,
    })
}

export const Jacobi = (req, res) => {
    const data = req.body
    let result = []
    let x1 = data.x1
    let x2 = data.x2
    let x3 = data.x3
    const A = [
        [data.a1, data.a2, data.a3],
        [data.a4, data.a5, data.a6],
        [data.a7, data.a8, data.a9],
    ]
    const b = [data.b1, data.b2, data.b3]
    let t1 = data.error
    let t2 = data.error
    let t3 = data.error
    let tt1 = 0.5
    let tt2 = 0.5
    let tt3 = 0.5
    let i = 1
    while (tt1 > t1 && tt2 > t2 && tt3 > t3) {
        let xk1 = (b[0] - A[0][1] * x2 - A[0][2] * x3) / A[0][0]
        let xk2 = (b[1] - A[1][0] * x1 - A[1][2] * x3) / A[1][1]
        let xk3 = (b[2] - A[2][0] * x1 - A[2][1] * x2) / A[2][2]
        tt1 = parseFloat(Math.abs((xk1 - x1) / xk1).toFixed(6))
        tt2 = parseFloat(Math.abs((xk2 - x2) / xk2).toFixed(6))
        tt3 = parseFloat(Math.abs((xk3 - x3) / xk3).toFixed(6))
        x1 = xk1
        x2 = xk2
        x3 = xk3
        result.push({
            iteration: i,
            x1: xk1,
            x2: xk2,
            x3: xk3,
            e1: tt1,
            e2: tt2,
            e3: tt3,
        })
        i++
    }
    res.json({ data: result })
}

export const GaussSeidel = (req, res) => {
    const data = req.body
    let result = []
    let x1 = data.x1
    let x2 = data.x2
    let x3 = data.x3
    let A = [
        [data.a1, data.a2, data.a3],
        [data.a4, data.a5, data.a6],
        [data.a7, data.a8, data.a9],
    ]
    const b = [data.b1, data.b2, data.b3]
    let t1 = 0.5
    let t2 = 0.5
    let t3 = 0.5
    let tt1 = data.error
    let tt2 = data.error
    let tt3 = data.error

    let i = 1
    while (t1 > tt1 && t2 > tt2 && t3 > tt3) {
        let xk1 = (b[0] - A[0][1] * x2 - A[0][2] * x3) / A[0][0]
        let xk2 = (b[1] - A[1][0] * xk1 - A[1][2] * x3) / A[1][1]
        let xk3 = (b[2] - A[2][0] * xk1 - A[2][1] * xk2) / A[2][2]
        t1 = parseFloat(Math.abs((xk1 - x1) / xk1).toFixed(6))
        t2 = parseFloat(Math.abs((xk2 - x2) / xk2).toFixed(6))
        t3 = parseFloat(Math.abs((xk3 - x3) / xk3).toFixed(6))
        x1 = xk1
        x2 = xk2
        x3 = xk3
        result.push({
            iteration: i,
            x1: xk1,
            x2: xk2,
            x3: xk3,
            e1: t1,
            e2: t2,
            e3: t3,
        })
        i++
    }
    res.json({ data: result })
}

export const Conjugate = (req, res) => {
    const data = req.body
    let result = []
    const A = [
        [data.a1, data.a2, data.a3],
        [data.a4, data.a5, data.a6],
        [data.a7, data.a8, data.a9],
    ]
    const B = [data.b1, data.b2, data.b3]
    let x = [data.x1, data.x2, data.x3]
    var R = subtract(multiply(A, x), B)
    var D = multiply(R, -1)
    let err = 1
    let iter = 1
    while (err > 0.000001) {
        var l =
            multiply(multiply(transpose(D), R), -1) /
            multiply(multiply(transpose(D), A), D)
        x = add(x, multiply(l, D))
        R = subtract(multiply(A, x), B)
        err = Math.sqrt(multiply(transpose(R), R)).toFixed(8)
        var a1 =
            multiply(multiply(transpose(R), A), D) /
            multiply(transpose(D), multiply(A, D)).toFixed(8)
        D = add(multiply(R, -1), multiply(a1, D))
        result.push({
            iteration: iter,
            l,
            x1: x[0],
            x2: x[1],
            x3: x[2],
            r1: R[0],
            r2: R[1],
            r3: R[2],
            err,
            a1,
            d1: D[0],
            d2: D[1],
            d3: D[2],
        })
        iter++
    }

    res.json({
        data: result,
    })
}

export default { Cramer,GaussElimination,GaussJordan,LUdecomposition,Jacobi,GaussSeidel,Conjugate }