import userModel from '../models/user.model.js'

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find({}, { password: 0 })
    res.status(202).json(allUsers)
  } catch (error) {
    res.status(405).send(error)
    console.error(error)
  }
}

export const getUserById = async (req, res) => {
  try {
    const userByID = await userModel.findById(req.params.id, { password: 0 })
    res.status(200).json(userByID)
  } catch (error) {
    res.status(405).send(error)
    console.error(error)
  }
}

export const getUserByUser = async (req, res) => {
  try {
    const userByUser = await userModel()

    // console.log('🚀  ~ res', res)
    console.log('🚀  ~ req', req)

    console.log(
      '🚀 ~ file: user.controller.js ~ line 26 ~ getUserByUser ~ userByID',
      userByUser,
    )
    res.status(200).json(userByUser)
  } catch (error) {
    res.status(405).send(error)
    console.error(error)
  }
}

export const deleteUserById = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id)
    res.status(200).send(`The user ${user.username} deleted successfully!`)
  } catch (error) {
    res.status(405).send(error)
    console.log(error)
  }
}

export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
        isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
      },
      { new: true },
    )
    res
      .status(200)
      .send(`The user ${updatedUser.username} updated successfully!`)
  } catch (error) {
    res.status(405).send(error)
    console.log(error)
  }
}

export const deleteAllUsers = async (req, res) => {
  try {
    await userModel.deleteMany()
    res.status(202).send('All users are deleted!')
  } catch (error) {
    res.status(405).send(error)
    console.error(error)
  }
}

export const logOut = (req, res) => {
  res
    .cookie('session_token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .send('Logged Out!')
}
