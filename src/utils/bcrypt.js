import bcrypt from 'bcrypt'

const salt = bcrypt.genSaltSync(parseInt(process.env.SALT))

export const hashPassword = async (password) => bcrypt.hash(password, salt)

export const validatePassword = async (password, hash) =>
  bcrypt.compare(password, hash)
