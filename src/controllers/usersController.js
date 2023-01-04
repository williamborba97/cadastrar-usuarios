const AppError =require('../utils/AppError')

class usersController{
create (request,response){
    const {name,email,password}= request.body;

    if(!name){
        throw new AppError('O nome é obrigatorio!')
    }
    
    response.status(201).json({name,email,password});
 }
}

module.exports= usersController