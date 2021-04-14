/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */



export const Newtondivied = async(req,res) => {
  const data = req.body
    let dex = []
    let dey = []
    let input = [] //input index
    for (const key in data.X) {
        dex.push(data.X[key])
    }
    for (const key in data.Y) {
        dey.push(data.Y[key])
    }
    let x = [],
        fx = []
    let push = () => {
        ;(x = []), (fx = [])
        input = input.map((value) => value - 1)
        input.map((value) => {
            x.push(dex[value])
            fx.push(dey[value])
        })
    }
    let Equation = (i, j) => {
        if (i == j) {
            return fx[i]
        } else if (Math.abs(j - i) == 1) {
            return (fx[j] - fx[i]) / (x[j] - x[i])
        } else {
            return (Equation(i + 1, j) - Equation(i, j - 1)) / (x[j] - x[i])
        }
    }
    let Result = (find) => {
        let sum = 0
        for (let i = 0; i < x.length; i++) {
            let temp = Equation(0, i)
            for (let j = 0; j < i; j++) {
                temp *= find - x[j]
            }
            sum += temp
        }
        return sum
    }
    for (const key in data.Nin) {
        input.push(data.Nin[key])
    }
    push()
    let ans = Result(data.Xw)
    res.json({ ans })
}


export const Lagrange = async(req,res) => {
     const data = req.body
    let x = []
    let y = []
    for (const key in data.X) {
        x.push(data.X[key])
    }
    for (const key in data.Y) {
        y.push(data.Y[key])
    }
    let fx = data.Xw
    let p
    let n = x.length
    let yp = 0

    for (let i = 0; i < n; i++) {
        p = 1
        for (let j = 0; j < n; j++) {
            if (i != j) {
                p = p * ((fx - x[j]) / (x[i] - x[j]))
            }
        }
        yp = yp + p * y[i]
    }
    let ans = parseFloat(yp.toFixed(4))
    res.json({ ans })
}

export default {Newtondivied,Lagrange}