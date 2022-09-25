import express from 'express'
import {
  createUser,
  isUserLoggedIn,
  loginUser,
} from '../controller/auth.controller.js'

const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/islogged', isUserLoggedIn)

export default router
