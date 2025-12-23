import express from "express"

const briefing = express()

briefing.get("/", (req, res) => {
    if (req.headers["client-unit"]) {
        if (req.headers["client-unit"] == "Golani") {
            res.json({ "unit": "Golani", "message": "briefing delivered" })
        } else {
            res.send(2)
        }
    } else {
        res.status(400).send(400)
    }
})

export  {briefing}
