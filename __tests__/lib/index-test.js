jest.mock('node-tailor')

const Tailor = require('node-tailor')
const Path = require('path')
const register = require('../../lib/index').register
const pkg = require('../../package.json')

describe('hapi-tailor-middleware', () => {
  let options
  let server
  let next
  let requestHandler

  beforeEach(() => {
    options = { templatesPath: Path.join(__dirname, 'templates') }
    server = { ext: jest.fn() }
    next = jest.fn()
    requestHandler = jest.fn()

    Tailor.mockImplementation(() => ({ requestHandler }))
  })

  it('should set the passed options to Tailor', () => {
    register(server, options, next)

    expect(Tailor.mock.calls[0][0]).toBe(options)
  })

  describe('onRequest-middleware', () => {
    let call
    const requestMock = {
      raw: {
        req: { test: 'request' },
        res: { test: 'response' }
      }
    }
    const reply = jest.fn()
    reply.continue = jest.fn()

    beforeEach(() => {
      register(server, options, next)
      call = server.ext.mock.calls[0]
    })

    it('should call server.ext with onRequest as first-argument', () => {
      expect(call[0]).toBe('onRequest')
    })

    it('should pass a function as second-argument', () => {
      expect(typeof call[1]).toBe('function')
    })

    describe('tailor.requestHandler', () => {
      let tailorArgs

      beforeEach(() => {
        call[1](requestMock, reply)
        tailorArgs = requestHandler.mock.calls[0]
      })

      it('should be called with req as first argument', () => {
        expect(tailorArgs[0]).toBe(requestMock.raw.req)
      })

      it('should be called with res as second argument', () => {
        expect(tailorArgs[1]).toBe(requestMock.raw.res)
      })

      it('should have a error-function as third argument', () => {
        expect(typeof tailorArgs[2]).toBe('function')
      })

      it('should call reply.continue when no error occurs else reply', () => {
        const cb = tailorArgs[2]

        cb('error')
        expect(reply.mock.calls.length).toBe(1)

        cb()
        expect(reply.continue.mock.calls.length).toBe(1)
      })
    })
  })

  it('should call the passed next-callback', () => {
    register(server, options, next)

    expect(next.mock.calls.length).toBe(1)
  })

  it('should return the package as register.attributes.pkg', () => {
    expect(register.attributes.pkg).toBe(pkg)
  })
})
