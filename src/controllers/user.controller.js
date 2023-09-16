import { userModel } from '../DAL/mongoDB/models/user.js'
import { getUsers, getUserById, deleteUser, updateActiveUser } from '../DAL/DAOs/mongoDAO/userMongo.js'
import { transporter } from '../utils/nodemailer.js'

export const changeUserRole = async (req, res) => {
  const { uid } = req.params
  try {
    const user = await userModel.findById(uid)


    if (user.role != 'admin') {

      user.role = user.role === 'user' ? 'premium' : 'user'

      await user.save()

      res.status(200).redirect('/api/admin/')
    } else {
      res.status(401).send({ message: "You can't change the admin role!!! GET OUT!" })
    }


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

    if (user.role != 'admin') {
      await transporter.sendMail({
        to: user.email,
        subject: ` Important information ${user.first_name}`,
        text: `
        Dear ${user.first_name} Please be informed that due to lack of use your account has been deleted
        Ecommerce Services`,
      })
      await deleteUser(uid)
      res.status(200).redirect('/api/admin/')
    } else {
      res.status(401).send({ Message: "C'mon! You are not allowed to delete the administrator" })
    }


  } catch (error) {
    res.status(401).send('Error deleting user')
  }

}

export const updateActiveAllUsers = async (req, res) => {
  try {

    const today = new Date
    const twoDaysAgo = new Date(today.getTime() - (1 * 24 * 60 * 60 * 1000));
    const thirtyMinutesAgo = new Date(today.getTime() - (30 * 60 * 1000)); // 30 minutos en milisegundos

    const filter = { last_connections: { $lt: twoDaysAgo } }
    const update = { $set: { active: false } }

    updateActiveUser(filter, update);
    res.status(200).redirect('/api/admin/')
  } catch (error) {
    res.status(401).send('Error updating active users')

  }
}

export const deleteAllInactiveUsers = async (req, res) => {

  const users = await getUsers()
  try {

    const usersToDelete = users.filter(user => user.active === false && user.role !== 'admin')

    usersToDelete.forEach(async (user) => {
      await deleteUser(user.id)
      await transporter.sendMail({
        to: user.email,
        subject: `Important information ${user.first_name}`,
        text: `
        Dear ${user.first_name} Please be informed that due to lack of use your account has been deleted
        Ecommerce Services`,
      })
    })
    res.status(200).redirect('/api/admin/')

  } catch (error) {
    res.status(401).send('Error deleting active users')

  }
}
