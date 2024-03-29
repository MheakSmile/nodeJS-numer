/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

import Spline from 'cubic-spline'
import { i, log } from 'mathjs'



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
    let l 
    let n = x.length    
    let yl = 0

    for (let i = 0; i < n; i++) {
        l = 1
        for (let j = 0; j < n; j++) {
            if (i != j) { //ถ้า I==J จะได้ตัวมันเลข-ตัวมันเอง = 0 * อะไรก็ได้ 0 
                l = l * ((x[j]- fx) / (x[j] - x[i]))
            }
        }
        yl = yl + l * y[i]
        //console.log("l=",l)
        //console.log("yi=",y[i])
    }
    console.log("yl=",yl)
    let ans = parseFloat(yl)
    res.json({ ans })
}

export const Splineinterpo = async(req,res) => {
    
      const data = req.body
    let x = []
    let y = []
    let ks = []
    for (const key in data.X) {
        x.push(data.X[key])
    }
    for (const key in data.Y) {
        y.push(data.Y[key])
    }
    const spline = new Spline(x, y)
    for (const key in spline.ks){
        ks.push(spline.ks[key])
    }
    res.json({data: ks})
 
}

export default {Newtondivied,Lagrange,Splineinterpo}