const Router = require ("express")

const TagsController = require ("../controllers/TagsController")



const TagsRoutes = Router()

const tagsController = new TagsController()

TagsRoutes.use("/:user_id",tagsController.index)

module.exports = TagsRoutes