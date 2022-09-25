import recipeModel from '../models/recipe.model.js'

export const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await recipeModel.find()
    res.status(202).json(allRecipes)
  } catch (error) {
    res.status(405).send(error)
    console.error(error)
  }
}

export const getAllRecipesByUser = async (req, res) => {
  try {
    const allRecipesByUser = await recipeModel.find({ creatorID: req.user.id })
    res.status(202).json(allRecipesByUser)
  } catch (error) {
    res.status(405).send(error)
    console.error(error)
  }
}

export const createRecipe = async (req, res) => {
  try {
    const newRecipe = new recipeModel({
      ...req.body.recipe,
      creatorID: req.user.id,
      author: req.user.name,
    })
    console.log()
    await newRecipe.save()
    res.status(201).send('New recipe is created')
  } catch (error) {
    res.status(405).send(error)
    console.error(error)
  }
}

export const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await recipeModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    )

    if (req.user.id !== updatedRecipe.creatorID) {
      return res.status(401).json('This is not your recipe!')
    }

    res.status(200).json('Recipe successfully UPDATED')
  } catch (error) {
    res.status(405).send(error)
    console.log(error)
  }
}

export const deleteRecipe = async (req, res) => {
  try {
    const deleteRecipe = await recipeModel.findByIdAndDelete(req.params.id)

    if (req.user.id !== deleteRecipe.creatorID) {
      return res.status(401).json('This is not your recipe!')
    }

    res.status(200).json('Recipe successfully DELETED')
  } catch (error) {
    res.status(405).send(error)
    console.log(error)
  }
}
