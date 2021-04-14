import express from "express"
import {Newtondivied,Lagrange} from "../controllers/interpolation.controller.js"
const interpolation_route = express.Router()


interpolation_route.post("/newton",(req,res)=>Newtondivied(req,res))
interpolation_route.post("/lagrange",(req,res)=>Lagrange(req,res))





export default interpolation_route