import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import dotenv from 'dotenv'
dotenv.config({ path: `${process.env.PWD}/.env` })


export const signIn = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (!existingUser) res.status(404).json({ message: 'User doesn\'t exist' })
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalide Credentials' })
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
    res.status(200).json({ result: existingUser, token })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) res.status(400).json({ message: 'User already exists' })
    if (password !== confirmPassword) res.status(400).json({ message: 'Passwords don\'t match' })
    const hashedPassword = await bcrypt.hash(password, 12)
    const result = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword
    })
    
    const token = jwt.sign({ email: result.email, id: result._id }, tokenSecret, { expiresIn: '1h' })
    return res.status(200).json({ result, token })
  } catch (error) {
    res.status(500).json({ error })
  }
}
