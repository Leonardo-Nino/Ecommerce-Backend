import { Router } from 'express'

const loggerRoutes = Router()

loggerRoutes.get('/', (req, res) => {
  req.logger.fatal('ERROR fatal PRODUCTION')
  req.logger.error('ERROR in PRODUCTION')
  req.logger.warning('warning PRODUCTION')
  req.logger.info('info ONLY FOR DEV')
  req.logger.http('http://localhost/:')
  req.logger.debug('Debug ONLY FOR DEV')

  res.send({
    Message: 'Testing logger in production for more logger info switch to dev',
  })
})

export default loggerRoutes
