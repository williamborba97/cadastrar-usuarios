//call express
const { response } = require('express');
const express = require('express');

//execute express
const app = express();

//create a route and show a message
app.get('/message/:id/:name',(request,response)=>{
const {id , name} = request.params;

response.send(`
ID da mensagem ${id}
nome do usuario${name}`)
});

app.get('/users',(request,response)=>{
const {page,limit} = request.params;

response.send(`
pagina: ${page}
limite: ${limit} `)
})


//create a PORT
const PORT = 3333;

//show a message in the console of where PORT is running
app.listen(PORT,()=>console.log(`Server is running on port${PORT}`));

//users?page=10&limit=4