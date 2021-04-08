import express from "express"
import {Cramer,GaussElimination,GaussJordan,LUdecomposition,Jacobi,GaussSeidel,Conjugate} from "../controllers/linear.controller.js"
const linear_route = express.Router()

linear_route.post("/cramer",(req,res)=>Cramer(req,res))
linear_route.post("/gausseli",(req,res)=>GaussElimination(req,res))
linear_route.post("/gaussjor",(req,res)=>GaussJordan(req,res))
linear_route.post("/lu",(req,res)=>LUdecomposition(req,res))
linear_route.post("/jacobi",(req,res)=>Jacobi(req,res))
linear_route.post("/gaussseidel",(req,res)=>GaussSeidel(req,res))
linear_route.post("/conjugate",(req,res)=>Conjugate(req,res))




export default linear_route