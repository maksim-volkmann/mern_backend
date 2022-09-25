import userModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new userModel({
      ...req.body,
      password: hash,
    })
    await newUser.save()
    res.status(201).send('New user is created')
  } catch (error) {
    res.status(405).send(error)
    console.error(error)
  }
}

export const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).send('Wrong email or password')
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password,
    )

    if (!isPasswordCorrect) {
      return res.status(404).send('Wrong email or password')
    }

    const token = jwt.sign(
      { id: user._id, name: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: '1 day',
      },
    )
    return res
      .cookie('session_token', token, {
        httpOnly: true,
      })
      .status(200)
      .send()
  } catch (error) {
    res.status(405).send(error)
    console.error(error)
  }
}

export const isUserLoggedIn = async (req, res) => {
  try {
    const token = req.cookies.session_token
    console.log(req.cookies)
    // console.log(res)
    if (!token) {
      return res.json(false)
    }

    jwt.verify(token, process.env.JWT_SECRET)

    res.status(200).send(true)
  } catch (error) {
    console.log(error)
    res.json(false)
  }
}
