import {target} from "./routers/tearget.js"
import {health} from "./routers/health.js"
import {briefing} from "./routers/briefing.js"
import express from "express"
import {getlog} from "./Middleware/Middleware.js"
const app = express()

app.use(express.json())
app.use(getlog)

app.use("/targets", target)
app.use("/health", health)
app.use("/briefing", briefing)

app.listen(8080, (req, res) => {
    console.log("server run ...");
})