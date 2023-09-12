import { createUser } from '../DAL/DAOs/mongoDAO/registerMongo.js'
import { userModel } from '../DAL/mongoDB/models/user.js'
import { transporter } from '../utils/nodemailer.js'

export const newUser = async (req, res) => {
  const { first_name, email } = req.body

  try {
    const user = await userModel.findOne({ email })
    if (user) {

      res.json({ menssage: 'User already registered' })
    } else {
      await createUser(req.body)
      await transporter.sendMail({
        to: email,
        subject: `Welcome  ${first_name}`,
        text: `User created successfully `,
      })
      res.status(200).redirect('session/login')
    }
  } catch (error) {
    res.status(500).json({ messasge: error })
    console.error(error)
  }
}
