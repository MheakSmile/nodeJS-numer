import express from "express";
import root_route from "./routes/root.route.js"
import bodyParser from "body-parser"
import cors from "cors"
import linear_route from "./routes/linear.route.js";
import regression_route from "./routes/regression.route.js"
import interpolation_route from "./routes/interpolation.route.js"

import {createRequire} from 'module'
const require = createRequire(import.meta.url)
const swaggerDocument = require('./swagger.json')
import swaggerUi from 'swagger-ui-express'

const app = express();
const PORT = 8080;


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument,{isExplorer: true})
)


app.use("/api/v1/root", root_route);
app.use("/api/v1/linear", linear_route);
app.use("/api/v1/regression",regression_route);
app.use("/api/v1/interpolation",interpolation_route);

app.listen(PORT,() => {
    console.log(`server Started at port ${PORT}`)
})