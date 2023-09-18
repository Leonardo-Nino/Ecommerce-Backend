import 'dotenv/config'
import { generateToken } from "../utils/JWTtoken.js"
import { updateLastConnection } from '../DAL/DAOs/mongoDAO/userMongo.js';
import currentUser from '../DTO/currentUser.js'
import jwt from 'jsonwebtoken';



export const login = async (req, res) => {
  try {
    if (!req.user) return res.status(400).send('Error loading user' + error)


    const user = new currentUser(req.user)
    await updateLastConnection(req.user._id);
    req.session.user = user
    const token = generateToken(user)
    res.cookie('myCookie', token, { maxAge: 36000000, httpOnly: true }).redirect('/api/products')
  } catch (error) {
    console.error(error)
    res.status(401).send('Error attempting login')
  }
}


// logout controller

export const logout = async (req, res, next) => {
  try {
    req.session.destroy()
    await updateLastConnection(req.user._id);
    res.redirect('login')
  } catch (error) {
    console.error(error)
    res.status(500).redirect('/api/errors/errorLog')
  }
}

// Current user 

export const current = async (req, res) => {
  try {
    const cookie = req.cookies['myCookie']
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    if (user)
      return res.send({ status: "success", payload: user })
    //res.status(200).send(new currentUser(req.user))
  } catch (error) {
    console.error(error)
    res.status(500).send({ status: "error", message: "Error obteniendo current user" });
  }
}

