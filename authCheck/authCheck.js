import jwt from 'jsonwebtoken'

const verifyUser = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next()
  } else {
    res.status(406).send('You are NOT admin!')
  }
}

const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    res.status(405).send('You are NOT logged in!')
  }
}

export const verifySessionTokenUser = (req, res, next) => {
  const token = req.cookies.session_token

  if (!token) {
    return res.status(401).send('Sorry, you are not logged in')
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(404).send('Token invalid')
    }

    req.user = decodedToken
    console.log(req.user)
    next()
  })
}

export const verifySessionTokenAdmin = (req, res, next) => {
  const token = req.cookies.session_token

  if (!token) {
    return res.status(401).send('User is not authorized')
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(404).send('Token invalid')
    }

    req.user = decodedToken
    verifyAdmin(req, res, next)
  })
}
