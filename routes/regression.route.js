import express from "express"
import {Linear, Multiple, Polynomial } from "../controllers/regression.controller.js"
const regression_route = express.Router()

regression_route.post("/linear",(req,res)=>Linear(req,res))
regression_route.post("/polynomial",(req,res)=>Polynomial(req,res))
regression_route.post("/multiple",(req,res)=>Multiple(req,res))





export default regression_route