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
      res.json({ menssage: `User with email : ${email} not found` })
    } else {
      await transporter.sendMail({
        to: email,
        subject: `Change password request`,
        html: ` Hello, ${user.first_name} please follow this <a href="${sendLink}">LINK</a> to change your password`
      })
      res.status(200).redirect('/api/session/login')
    }
  } catch (error) {
    res.status(500).send('Error retriveing user')
  }
}


export const checkLink = async (req, res) => {
  const { token } = req.params
  try {
    const isValidToken = jwt.verify(token, process.env.JWT_SECRET)
    if (isValidToken) {
      res.status(200).render('resetPass', { token })
    } else
      res.status(400).render('api/errors/errorLog')
  } catch (error) {
    res.send(error)
  }

}
export const newPass = async (req, res) => {
  const { pass, token } = req.body


  try {
    const isValidToken = jwt.verify(token, process.env.JWT_SECRET)
    if (isValidToken) {
      //console.log(isValidToken.user)

      const userEmail = { email: isValidToken.user.email }
      const newPass = {
        password: pass,
      }
      const user = await changePassword(userEmail, newPass)

      res.status(200).send("Your password has been changed please log in")
    } else console.log('algo anda mal')
  } catch (error) {
    res.send(error)
    console.log(error)
  }
}
