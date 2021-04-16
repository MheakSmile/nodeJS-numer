import express from "express"
import {Newtondivied,Lagrange,Splineinterpo} from "../controllers/interpolation.controller.js"
const interpolation_route = express.Router()


interpolation_route.post("/newton",(req,res)=>Newtondivied(req,res))
interpolation_route.post("/lagrange",(req,res)=>Lagrange(req,res))
interpolation_route.post("/spline",(req,res)=>Splineinterpo(req,res))





export default interpolation_route