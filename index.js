import express from "express";
import root_route from "./routes/root.route.js"
import bodyParser from "body-parser"
import cors from "cors"
import linear_route from "./routes/Linear.route.js";
const app = express();
const PORT = 8080;




app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/api/v1/root", root_route);
app.use("/api/v1/linear", linear_route);

app.listen(PORT,() => {
    console.log(`server Started at port ${PORT}`)
})