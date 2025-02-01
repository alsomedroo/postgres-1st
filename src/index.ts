import express from 'express'
import { Client } from 'pg';


const app = express()
app.use(express.json())


const pgClient = new Client("postgresql://neondb_owner:npg_BrTS9YdoGW5a@ep-lucky-glade-a8jsvzdx-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");
pgClient.connect()

app.post("/signup", async(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    try{
        const insertQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3);'
        const response = await pgClient.query(insertQuery,[username, password, email])
        res.json({
            message: "You have sign up"
        })

    } catch (e){
        console.log(e)
        res.json({
            message: "Error: try again" 
        })
    }
})

app.listen(3000)

