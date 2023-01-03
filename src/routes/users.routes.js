const {Router} = require ('express')

const UsersController =require('../controllers/usersController')

const UsersRoutes = Router();

function myMiddleware(request,response,next){
    
}


const usersController = new UsersController; 

UsersRoutes.post('/',myMiddleware,usersController.create)

    module.exports = UsersRoutes