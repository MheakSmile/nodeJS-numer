import fetch from "node-fetch"
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */

export const Bisection = async(req,res) => {
    const data = req.body
    let xl = data.xl;
    let xr = data.xr;
    let i = 0;
    let er = 1
    let er1 = data.error;
    let xm, xmbefore, fxm, fxr;
    let result = [];

    while (er > er1) {
      //step1
      xm = (xl + xr) / 2;
      fxm = Math.pow(xl, 4) - 13;
      fxr = Math.pow(xr, 4) - 13;
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
    let fxl = (xl) => Math.pow(xl, 4) - 13
    let fxr = (xr) => Math.pow(xr, 4) - 13
    while (er > er1) {
        x1 = (xl * fxr(xr) - xr * fxl(xl)) / (fxr(xr) - fxl(xl))
        f = x1 * fxr(xr)
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
  let result = [];
  let x = data.x;
  let er = 1;
  let er1 =data.error;
  let i =0;
  let xi,fx,diffx;
  while(er>er1){
    console.log("Iterration = ",i);
    if(i>0){
    fx = Math.pow(x,2)-7;
    diffx = x*2;
        xi = x-(fx/diffx);
        console.log("xi = ",xi);
        er = Math.abs((xi-x)/xi).toFixed(5);
        console.log("error = ",er);
        x = xi;
    }
    else{
        console.log("x = ",x);
    }
    {
      if(i>0)
            result.push({ 
              iteration: i, 
              x, 
              fx,
              diffx,
              er, 
            })
        }
    i++;
}
    res.json({ 
      data: result 
    })
}


export const  Onepoint = async(req,res) =>{
  const data = req.body
  let result =[];
  let x = data.x;
  let er = 1;
  let i =0;
  let er1 = data.error;
  let xi;
while(er>er1){
        xi = ((1/4) + (x/2));
        er = Math.abs((xi-x)/xi).toFixed(6);
        console.log("error = ",er);
        x = xi;
        console.log("x = ",x);
        i++;
            {
      if(i>0)
            result.push({ 
              iteration: i, 
              x, 
              er, 
            })
        }
      }
       res.json({ 
      data: result 
    })
}


export const  Secant = async(req,res) =>{
  const data = req.body
  let result =[];
  let x0 = data.x0;
let x1 = data.x1;
let er = 1;
let er1 =data.error
let i = 1;
let x2 = data.x2;
while(er > er1){
    console.log("Iteration:",i);
    let fx1 = Math.pow(x0,2) - 7;
    let fx2 = Math.pow(x1,2) - 7;
    let x = x1+(-((fx2)*(x0-x1))/(fx1-fx2));
    x0 = x1;
    x2 = x;
    console.log("x :",x2);
    er = (Math.abs((x2-x1)/x2).toFixed(5));
    x1 = x2;
    console.log("error :",er);   
    {
      if(i>0)
            result.push({ 
              iteration: i, 
              fx1,
              fx2,
              x0,
              x1,                   
              er, 
            })
        }
        i++;
}
         res.json({ 
      data: result 
    })
}

export default { Bisection,Falseposition,Newtonraphon,Onepoint,Secant}