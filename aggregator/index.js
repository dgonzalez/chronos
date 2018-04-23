const Hapi = require('hapi')
const server = new Hapi.Server()
let request = require('request-promise')

server.connection({port: 8080})

server.route({
  method: 'GET',
  path: '/dates/{timestamp}',
  handler: async (req, reply) => {
    const utcEndpoint = `http://localhost:3001/${req.params.timestamp}/utcdate`
    const isoEndpoint = `http://localhost:3000/${req.params.timestamp}/isodate`
    let utcBody = await request(utcEndpoint)
    let isoBody = await request(isoEndpoint)
    reply({
      utcDate: JSON.parse(utcBody).date,
      isoDate: JSON.parse(isoBody).date
    })
  }
})

server.start((err) => {
  if (err) {
    throw err
  }
  console.log('aggregator started on port 8080')
})
