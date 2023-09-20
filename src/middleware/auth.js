


export const auth = (role) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).redirect('/api/unauthorized');


    }

    if (role.includes(req.user.role)) {
      return next()
    } else {
      return res.status(401).redirect('/api/unauthorized');
    }
  }
}
