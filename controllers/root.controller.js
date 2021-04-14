
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
import {derivative,simplify,evaluate} from 'mathjs'
export const Bisection = async(req,res) => {
    const data = req.body
    let xl = data.xl;
    let xr = data.xr;
    let i = 0;
    let er = 1
    let er1 = data.error;
    let xm, xmbefore, fxm, fxr;
    let result = [];
    let fx =(x) =>{
      let a = simplify(data.eq).toString()
      return evaluate(a, {x})
    }

    while (er > er1) {
      //step1
      xm = (xl + xr) / 2;
      fx = Math.pow(xl, 4) - 13;
      fx = Math.pow(xr, 4) - 13;
      //step2
      let check = fxm * fxr;
      //step3
      if (check < 0) {
        //step4
        if (i > 0) {
          er = parseFloat(Math.abs((xm - xmbefore) / xm).toFixed(6));
        }
        xl = xm;
        xmbefore = xm;
      } else {
        //step4
        if (i > 0) {
          er = parseFloat(Math.abs((xm - xmbefore) / xm).toFixed(6));
        }
        xr = xm;
        xmbefore = xm;
      }
      
      result.push({
        iteration: i,
        xl,
        xr,
        xm,
        er,
      });
  
      i++;
    }
    res.json({
        data: result,     
    })
}


export const  Falseposition = async(req,res) =>{
const data = req.body
    let result = []
    let i = 0
    let xl = data.xl
    let xr = data.xr
    let f = 0
    let x1 = 0.5
    let er = 1
    let er1 = data.error
     let fx =(x) =>{
      let a = simplify(data.eq).toString()
      return evaluate(a, {x})
    }
    // let fx = (xl) => Math.pow(xl, 4) - 13
    // let fx = (xr) => Math.pow(xr, 4) - 13
    while (er > er1) {
     fx = (xl) => Math.pow(xl, 4) - 13
     fx = (xr) => Math.pow(xr, 4) - 13
        x1 = (xl * fx(xr) - xr * fx(xl)) / (fx(xr) - fx(xl))
        f = x1 * fx(xr)
        if (i == 0) {
            if (f < 0) {
                xl = x1
            } else {
                xr = x1
            }
        } else {
            console.log('Iteration : ', i)
            console.log('x1 : ', x1)

            if (f < 0) {
                er = parseFloat(Math.abs((x1 - xl) / x1).toFixed(5))
                console.log('error:', er)
                xl = x1
            } else {
                er = parseFloat(Math.abs((x1 - xr) / x1).toFixed(5))
                console.log('error', er)
                xr = x1
            }
        }
        if (i > 0) {
            result.push({ 
              iteration: i, 
              xl, 
              xr, 
              x1, 
              er, 
            })
        }
        i++
    }
    
    res.json({ 
      data: result 
    })
}


export const  Newtonraphon = async(req,res) =>{
 const data = req.body
    let result = []
    let xi = data.x
    let e = 1
    let error = data.error
    let i = 1
    let f1 = (x) => {
        let a = simplify(data.eq).toString()
        return evaluate(a, { x })
    }
    let fx = (x) => {
        let diff = derivative(data.eq, 'x').toString()
        diff = simplify(diff).toString()
        return evaluate(diff, { x })
    }
    while (e > error) {
        let fx1 = parseFloat(f1(xi).toFixed(5))
        let fx2 = parseFloat(fx(xi).toFixed(5))
        let x = parseFloat((xi - fx1 / fx2).toFixed(5))
        e = parseFloat(Math.abs((x - xi) / x).toFixed(5))
        xi = x
        result.push({ iteration: i, xi, fx1, fx2, x, err: e })
        i++
    }
    res.json({ data: result })
  }


export const  Onepoint = async(req,res) =>{
  const data = req.body
    let result = []
    let x = data.x
    let i = 0
    let xi
    let er = 1
    let er1 = data.error
    if (er1 == null || er1 <= 0) {
        er1 = 0.000001
    }
    let fx = (x) => {
        let a = simplify(data.eq).toString()
        return evaluate(a, { x })
    }
    while (er >= er1) {
        if (i > 0) {
            xi = fx(x)
            er = parseFloat(Math.abs((xi - x) / xi).toFixed(5))
            x = xi
            result.push({ iteration: i, x, er })
        }
        i++
    }
    res.json({
        data: result,
    })
}


export const  Secant = async(req,res) =>{
  const data = req.body
    let result = []
    let x0 = data.x0
    let x1 = data.x1
    let i = 1
    let xi, fx0, fx1, deltax
    let er = 1
    let er1 = data.error
    if (er1 == null || er1 <= 0) {
        er1 = 0.000001
    }
    let fx = (x) => {
        let a = simplify(data.eq).toString()
        return evaluate(a, { x })
    }
    while (er >= er1) {
        if (i > 0) {
            fx0 = fx(x0).toFixed(5)
            fx1 = fx(x1).toFixed(5)
            deltax = parseFloat(((fx1 * (x0 - x1)) / (fx0 - fx1)).toFixed(5))
            xi = parseFloat((x1 - deltax).toFixed(5))
            er = parseFloat(Math.abs((xi - x1) / xi).toFixed(6))
            x0 = x1
            x1 = xi
            result.push({ iteration: i, x0, x1, fx0, fx1, deltax, xi, er })
        }
        i++
    }
    res.json({
        data: result,
    })
}

export default { Bisection,Falseposition,Newtonraphon,Onepoint,Secant}