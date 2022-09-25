import mongoose from 'mongoose'
const Schema = mongoose.Schema

const recipeShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    image2: {
      type: String,
      required: true,
    },
    image3: {
      type: String,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    readyIn: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    goodFor: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    description1: {
      type: String,
      required: true,
    },
    description2: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    creatorID: {
      type: String,
    },
  },
  { timestamps: true },
)

export default mongoose.model('recipe', recipeShema)
