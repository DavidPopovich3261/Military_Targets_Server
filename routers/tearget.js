import express from "express"
import { hasSameProps } from "../utils/hasSameProps.js"
import { promises as fs } from "fs"


export const target = express()


target.get("/:id", async (req, res) => {
    try {
        let data = await fs.readFile("./data/targets.json", "utf8")
        data = JSON.parse(data)
        let dataById = await data.filter((Target) => {
            if (Target.id == req.params.id) { return true }
        })
        if (dataById[0] != undefined) {
            res.json(dataById)
        } else {
            res.status(404).send("not found")
        }
    } catch (err) {
        res.json(err)
    }
})

target.get("/", async (req, res) => {
    try {
        let data = await fs.readFile("./data/targets.json", "utf8")
        data = JSON.parse(data)
        if (req.query["region"]) {
            data = data.filter((Target) => {
                if (Target["region"] == req.query["region"]) { return true }
            })
        } if (req.query["status"]) {
            data = data.filter((Target) => {
                if (Target["status"] == req.query["status"]) { return true }
            })
        } if (req.query["minPriority"]) {
            data = data.filter((Target) => {
                if (Target["priority"] >= req.query["minPriority"]) { return true }
            })
        }
        res.json(data)
    } catch (err) {
        res.json(err)
    }
})

target.post("/", async (req, res) => {
    try {
        const keys = ["id", "codeName", "region", "priority", "status", "createdAt"]
        if (req.headers["content-type"] == "application/json" && hasSameProps(keys, req.body)) {
            let data = await fs.readFile("./data/targets.json", "utf8")
            data = JSON.parse(data)
            data.push(req.body)
            data = JSON.stringify(data)
            await fs.writeFile("./data/targets.json", data)
            res.status(200).send("appended")
        } else {
            res.status(400).send("not compatible")
        }
    } catch (error) {
        console.error((error))
        res.json(error)
    }
})


target.put("/:id", async (req, res) => {
    try {
        let data = await fs.readFile("./data/targets.json", "utf8")
        data = JSON.parse(data)
        for (let Target of data) {
            if (Target.id == req.params.id) {
                for (let key in req.body) {
                    Target[key] = req.body[key]
                }
            }
        }
        data = JSON.stringify(data)
        await fs.writeFile("./data/targets.json", data)
        res.status(200).send("update")
    } catch (error) {
        console.error(error);
    }
})


target.delete("/:id", async (req, res) => {
    try {
        let data = await fs.readFile("./data/targets.json", "utf8")
        data = JSON.parse(data)
        data = await data.filter((target)=>{
            if(target.id != req.params.id){
                return true
            }
        })
        data = JSON.stringify(data)
        await fs.writeFile("./data/targets.json", data)
        res.status(200).send("delete")
    } catch (error) {
        console.error(error);
    }
})