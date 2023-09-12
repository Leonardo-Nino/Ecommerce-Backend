import { Router } from 'express'
import { auth } from '../middleware/auth.js'
import { messagesModel } from '../DAL/mongoDB/models/messages.js'

const messagesRouters = Router()

messagesRouters.get('/', auth(['user']), async (req, res) => {
  try {
    req.io.on('connection', async (socket) => {
      console.log('client connected')
      socket.on('message', async (data) => {
        await messagesModel.create(data)
        req.io.emit('messages', await messagesModel.find())
      })
    })
    res.render('messages')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error getting messages')
  }
})
export default messagesRouters
