import { userModel } from '../DAL/mongoDB/models/user.js'
import { getUsers, getUserById, deleteUser } from '../DAL/DAOs/mongoDAO/userMongo.js'
import { transporter } from '../utils/nodemailer.js'

export const changeUserRole = async (req, res) => {
  const { uid } = req.params
  try {
    const user = await userModel.findById(uid)

    user.role = user.role === 'user' ? 'premium' : 'user'

    await user.save()

    res.status(200).redirect('/api/admin/')

  } catch (error) {
    res.status(401).send('Error changing user role')
  }
}

export const allUser = async (req, res) => {
  try {
    const users = await getUsers()


    res.render('admin', { users: users })


  } catch (error) {

    res.status(401).send('Error getting users')
  }


}



export const deleteOneUser = async (req, res) => {
  const { uid } = req.params

  const user = await getUserById(uid)

  try {

    await transporter.sendMail({
      to: user.email,
      subject: ` Important information ${user.first_name}`,
      text: `
      Dear ${user.first_name} Please be informed that due to lack of use your account has been deleted
      Ecommerce Services`,
    })

    await deleteUser(uid)
    res.status(200).redirect('/api/admin/')

  } catch (error) {
    res.status(401).send('Error changing user role')
  }

}
