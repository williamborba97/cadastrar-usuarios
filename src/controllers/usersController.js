const {hash,compare} = require ("bcryptjs");
const AppError =require('../utils/AppError');
const sqliteConnection = require('../database/sqlite');


class usersController{
async create (request,response){
    const {name,email,password}= request.body;
 
    const database = await sqliteConnection();
    const checkUserExist = await database
    .get("SELECT * FROM users Where email =(?)",[email]); 
    
    if(checkUserExist){
        throw new AppError('Este email ja esta em uso.')
    }

    const hashedPassword = await hash(password ,8)

    await database.run("INSERT INTO users (name,email,password) VALUES(?,?,?)",
    [name,email,hashedPassword]
    )


    return response.status(201).json();
    }

async update(request,response){
    const {name,email,password,old_password} = request.body;
    const {id} = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id =(?)",[id]);

    if(!user){
        throw new AppError("Usuario nao encontrado")
    }

    const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)',[email])

    if(userWithUpdatedEmail && userWithUpdatedEmail.user !== user.id){
        throw new AppError("este email ja esta em uso")
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password){
        throw new AppError("voce precisa informar a senha antiga para definir a senha nova")  
    }
   

    if(password && old_password){
        const checkOld_password = await compare(old_password ,user.password)
    
        if(!checkOld_password){
            throw new AppError("As senhas nao conferem")
        }

        user.password = await hash(password,8)
    }

    await database.run(
        `UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at= DATETIME('now ')
        WHERE id = ?`,
        [user.name,user.email,user.password,id]
        );

        return response.json()
    }

    
}



module.exports= usersController