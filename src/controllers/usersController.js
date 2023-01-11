const AppError =require('../utils/AppError')

const sqliteConnection = require('../database/sqlite')

class usersController{
async create (request,response){
    const {name,email,password}= request.body;
 
    const database = await sqliteConnection();
    const checkUserExist = await database
    .get("SELECT * FROM users Where email =(?)",[email]); 
    
    if(checkUserExist){
        throw new AppError('Este email ja esta em uso.')
    }

    await database.run("INSERT INTO users (name,email,password) VALUES(?,?,?)",
    [name,email,password]
    );


    return response.status(201).json();
    }


}

module.exports= usersController