/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
import regressions from 'regression'
import regression from './lib/multi.js'

export const  Linear = async(req,res) =>{
    const data = req.body
    let x =[]
    let y =[]
    let data2 =[]
    
    for(const key in data.X){
        x.push(data.X[key])
    }
     for(const key in data.Y){
        y.push(data.Y[key])
    }
    x.map((r,i)=>{
        data2.push([x[i],y[i]])
    })
    const linear = regressions.linear(data2)
    // console.log(linear)
    // console.log(x,y,data2)
    res.json({data: linear, result: linear.predict(data.Predic)})
    // console.log(data)
    // res.json({})
    
}


export const  Polynomial = async(req,res) =>{
    const data = req.body
    let x =[]
    let y =[]
    let data2 =[]
    
    for(const key in data.X){
        x.push(data.X[key])
    }
     for(const key in data.Y){
        y.push(data.Y[key])
    }
    x.map((r,i)=>{
        data2.push([x[i],y[i]])
    })
    //const linear = regressions.linear(data2)
    const poly = regressions.polynomial(data2,{order:data.Order})
    // console.log(linear)
    // console.log(x,y,data2)
    res.json({data: poly, result: poly.equation})
    // console.log(data)
    // res.json({})
    
}


export const  Multiple = async(req,res) =>{
      const data = req.body
    let x1 = []
    let x2 = []
    let x3 = []
    let y = []
    let datas = []
    for (const key in data.X1) {
        x1.push(data.X1[key])
    }
    for (const key in data.X2) {
        x2.push(data.X2[key])
    }
    for (const key in data.X3) {
        x3.push(data.X3[key])
    }
    for (const key in data.Y) {
        y.push(data.Y[key])
    }
    x1.map((r, i) => {
        datas.push([x1[i], x2[i], x3[i], y[i]])
    })
    const multi = regression(datas)
    res.json({ ans: multi }) 
}

export default {Linear,Polynomial,Multiple}