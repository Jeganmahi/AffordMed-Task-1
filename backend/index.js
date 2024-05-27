const mysql = require('mysql');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors())
app.use(express.json());


app.get('/userData', async (req,res) => {
  const data = await prisma.details.findMany();
  return res.json(data);
})

app.get('/fetchData',async(req,res) => {
  const data = await prisma.details.findMany();
  console.log(data);
  return res.json(data);
})
app.get('/fetchProfileData/:name',async(req,res) => {
  const name = req.params.name;
  console.log(name);
  const data = await prisma.details.findFirst({
    where:{
      name:name
    }
  })
  return res.json(data);
})

app.get('/updateLogout/:email',async (req,res) => {
  const email = req.params.email
  console.log(email);
  const data = await prisma.details.findFirst({
    where:{
      name:email
    },
    select:{
      id:true
    }
  })
  console.log(data);
  var currentdate = new Date();
      var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
        console.log(datetime);
  const update = await prisma.details.update({
    where:{
      id:data.id
    },
    data:{
      logout:datetime
    }
  })
  return res.json(update);

})
app.put('/handleLogin', async (req, res) => {
  console.log(req.body);
  try {
    const data = await prisma.login_Table.findFirst({
      where: {
        email: req.body.email,
        pass: req.body.pass
      }
    })
    if (data.role === "admin") {

      return res.json(data);
    }
    else {
      var currentdate = new Date();
      var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
        console.log(datetime);
        const find = await prisma.details.findFirst({
          where:{
            name:req.body.email
          },
          select:{
            id:true
          }
        })
        const update = await prisma.details.update({
          where:{
            id:find.id
          },
          data:{
            login:datetime,
            logout:"0000"
          }
        })
        return res.json(data);
    }
  } catch (error) {
    console.error("Error occurred during search:", error);
    return res.status(500).json({ error: "An error occurred during search" });
  }
});
app.listen(5001, () => {

  console.log("Server is running on http://localhost:5001");
});