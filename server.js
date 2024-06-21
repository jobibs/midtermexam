const express=require("express")
const moment=require('moment')
const app=express()
const cors=require('cors')
const path=require('path')
const mysql=require("mysql")
const {connect} = require('http2')


const logger=(req,res,next)=>{


    console.log(`${req.protocol}://${req.get('host')}${req.originalUrL}  :  ${moment().format()}`)

    next()



}



const PORT=process.env.PORT || 5000;



//Step 1: establishing connection

const connection = mysql.createConnection({



    host:"localhost",

    user:"root",

    password:"",

    database:"employee"

})



//Step 2: sending queries



connection.connect();

app.use(express.urlencoded({extended: false}));

app.use(cors())

app.use(logger)

app.use(express.json())

app.get("/api/members", (req, res) =>{



    connection.query("SELECT * FROM userdata", (err, rows, fields) => {



        //Step 3: processing the result



        //Step 4: handling errors

        if(err) throw err;



        res.json(rows)



    })

})



//new api link

//method get - search - report

app.get("/api/members/:id", (req,res)=>{



    const fn=req.params.id



    connection.query(`SELECT * FROM userdata WHERE id=${fn}`, (err,rows,fields)=>{



        if(err) throw err;



        if(rows.length > 0){



            res.json(rows)



        }else{



            res.status(400).json({msg: `${fn} id is not found!`})



        }



    })

})



//POST - insert

app.post("/api/members", (req,res) =>{



    const fname=req.body.fname;

    const lname=req.body.lname;

    const email=req.body.email;

    const gender=req.body.gender;

    const ip_address=req.body.ip_address;



    connection.query(`INSERT INTO userdata (first_name, last_name, email, gender, ip_address) VALUES ("${fname}", "${lname}", "${email}", "${gender}", "${ip_address}")`,(err,row,fields) =>{



        if(err)throw err;

        res.json({msg:`Successful inserted`})

    })



})



//crud



app.put('/api/members', (req, res) => {



    const fname=req.body.fname;

    const lname=req.body.lname;

    const email=req.body.email;

    const gender=req.body.gender;

    const id=req.body.id;




    connection.query(`UPDATE userdata SET first_name='${fname}',last_name='${lname}',email='${email}' ,gender='${gender}' WHERE id= '${id}'`, (err,rows,fields)=>{



        if(err) throw err

        res.json({msg: `Succesfully updated`})

        

    })




})

//Delete

app.delete('/api/members', (req, res) => {

   
    const id=req.body.id;



    connection.query(`DELETE FROM userdata WHERE id = '${id}'`, (err,rows,fields)=>{



        if(err) throw err

        res.json({msg: `Succesfully deleted`})

        

    })




})


app.listen(5000,() => {

    console.log(`server is running on port ${PORT}`)

})
