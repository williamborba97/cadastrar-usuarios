const {Router} = require("express");

const UsersRouter= require('./users.routes');
const NotesRouter = require("./notes.routes");

const routes = Router();

routes.use("/users",UsersRouter);
routes.use("/notes",NotesRouter);

module.exports = routes;