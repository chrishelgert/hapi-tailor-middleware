const Tailor = require('node-tailor')
const pkg = require('../package.json')

exports.register = (server, options, next) => {
  const tailor = new Tailor(options)

  server.ext('onRequest', (request, reply) => {
    const { req, res } = request.raw

    tailor.requestHandler(req, res, (error) => {
      if (error) {
        return reply(error)
      }

      return reply.continue()
    })
  })

  return next()
}

exports.register.attributes = { pkg }
