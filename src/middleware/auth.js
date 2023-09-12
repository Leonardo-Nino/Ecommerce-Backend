export const auth = (role) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ Error: 'You must be logged in' })
    }

    if (role.includes(req.user.role)) {
      return next()
    } else {
      return res.status(401).json({ Error: 'unauthorized' })
    }
  }
}
