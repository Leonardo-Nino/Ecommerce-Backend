import 'dotenv/config'
import { transporter } from '../utils/nodemailer.js'
import { generateToken } from '../utils/JWTtoken.js'
import { userModel } from '../DAL/mongoDB/models/user.js'
import { changePassword } from '../DAL/DAOs/mongoDAO/registerMongo.js'
import jwt from 'jsonwebtoken'

export const generatelink = async (req, res) => {
  const { email } = req.body
  const user = await userModel.findOne({ email })
  const token = generateToken(user)
  const sendLink = `http://localhost:4000/api/resetPass/newPassword/${token}`

  try {
    if (!user) {
      res.json({ menssage: `User with email : ${email}  not found` })
    } else {
      await transporter.sendMail({
        to: email,
        subject: `Change password request`,
        text: `Hello, ${user.first_name} please follow the  link to change your password:
        ${sendLink}`,
      })
      res.status(200).send('Mail sent successfully')
    }
  } catch (error) {
    res.status(500).send('Error retriveing user')
  }
}

export const newPass = async (req, res) => {
  const { pass } = req.body
  const { token } = req.params

  try {
    const isValidToken = jwt.verify(token, process.env.JWT_SECRET)
    if (isValidToken) {
      //console.log(isValidToken.user)

      const userEmail = { email: isValidToken.user.email }
      const newPass = {
        password: pass,
      }
      const user = await changePassword(userEmail, newPass)
      console.log(user)

      res.status(200).json({ Message: 'New password changed' })
    } else console.log('algo anda mal')
  } catch (error) {
    res.send(error)
    console.log(error)
  }
}
