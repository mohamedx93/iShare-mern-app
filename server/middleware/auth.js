import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: `${process.env.PWD}/.env` })

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (authHeader) {
      console.log('auth')
      const token = authHeader.split(' ')[1]
      const isCustomAuth = token.length < 500
      let decodedData
      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = decodedData?.id
      } else {
        decodedData = jwt.decode(token)

        req.userId = decodedData?.sub
      }
      next()
    } else {
      res.status(401)
    }
  } catch (error) {
    console.log(error)
  }
}

export default auth
