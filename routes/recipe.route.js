import express from 'express'
import { verifySessionTokenUser } from '../authCheck/authCheck.js'
import {
  createRecipe,
  getAllRecipes,
  getAllRecipesByUser,
  updateRecipe,
} from '../controller/recipe.controller.js'

const router = express.Router()

router.post('/create', verifySessionTokenUser, createRecipe)
router.get('/get', getAllRecipes)
router.get('/byuser', getAllRecipesByUser)
router.put('/update/:id', verifySessionTokenUser, updateRecipe)

export default router
