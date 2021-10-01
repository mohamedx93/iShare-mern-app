import jwt from 'jsonwebtoken'
import { tokenSecret } from '../constants/constants.js'

const auth = (req, res, next) => {
  try {
    console.log('middleWare')
    const authHeader = req.headers.authorization
    if (authHeader) {
      const token = authHeader.split(' ')[1]
      const isCustomAuth = token.length < 500
      let decodedData
      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, tokenSecret)
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
