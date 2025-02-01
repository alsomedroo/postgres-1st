import express from 'express'
import { Client } from 'pg';


const app = express()
app.use(express.json())


const pgClient = new Client("postgresql://neondb_owner:npg_BrTS9YdoGW5a@ep-lucky-glade-a8jsvzdx-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");
pgClient.connect()
//@ts-ignore
app.post("/signup", async(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    if(!username ||!password ||!email){
        return res.json({
            message: "Please provide all required fields"
        })
    }
    const city = req.body.city
    const country = req.body.country
    const street = req.body.street
    const pincode = req.body.pincode
     

    try{
        const insertQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;'
        const response = await pgClient.query(insertQuery,[username, password, email])
        console.log(response)
        const addressInsertQuery = 'INSERT INTO addresses (city, country, street, pincode, user_id) VALUES ($1, $2, $3, $4, $5);'
        const addressResponse = await pgClient.query(addressInsertQuery,[city, country, street, pincode, response.rows[0].id]) 
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

