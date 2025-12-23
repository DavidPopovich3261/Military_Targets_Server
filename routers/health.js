import express from "express"

const health = express()

health.get("/", (req, res) => {
    res.json({
        "status": "ok",
        "serverTime": new Date
    })
})

export  {health}