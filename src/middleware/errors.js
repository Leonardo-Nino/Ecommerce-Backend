import EError from '../errors/enums.js'

export default (error, req, res, next) => {
  console.error(error.cause)
  switch (error.code) {
    case EError.INVALID_TYPES_ERROR:
      res.send({ status: 'Error', error: error.name })
      break

    case EError.INVALID_ARGUMENT:
      res.send({ status: 'Error', error: error.name })
      break

    default:
      res.send({ status: 'error', error: 'unhandled error' })
  }
}
