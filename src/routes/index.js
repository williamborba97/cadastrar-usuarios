const {Router} = require("express");

const UsersRouter= require('./users.routes');
const NotesRouter = require("./notes.routes");
const TagsRouter = require("./tags.routes");

const routes = Router();

routes.use("/users",UsersRouter);
routes.use("/notes",NotesRouter);
routes.use("/tags",TagsRouter)


module.exports = routes;