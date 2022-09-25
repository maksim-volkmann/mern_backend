import express from 'express'
import {
  verifySessionTokenAdmin,
  verifySessionTokenUser,
} from '../authCheck/authCheck.js'
import {
  deleteAllUsers,
  deleteUserById,
  getAllUsers,
  getUserById,
  getUserByUser,
  logOut,
  updateUserById,
} from '../controller/user.controller.js'

const router = express.Router()

router.get('/get', getAllUsers)

router.get('/get/user', getUserByUser)

router.get('/get/:id', verifySessionTokenUser, getUserById)

router.delete('/delete/:id', verifySessionTokenUser, deleteUserById)

router.delete('/delete', verifySessionTokenAdmin, deleteAllUsers)

router.put('/update/:id', verifySessionTokenUser, updateUserById)

router.get('/logout', logOut)

export default router
