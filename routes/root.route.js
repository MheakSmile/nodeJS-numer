import express from "express"
import {Bisection,Falseposition,Newtonraphon,Onepoint,Secant} from "../controllers/root.controller.js"
const root_route = express.Router()

root_route.post("/bisection",(req,res)=>Bisection(req,res))
root_route.post("/falseposition",(req,res)=>Falseposition(req,res))
root_route.post("/newtonraphon",(req,res)=>Newtonraphon(req,res))
root_route.post("/onepoint",(req,res)=>Onepoint(req,res))
root_route.post("/secant",(req,res)=>Secant(req,res))




export default root_route