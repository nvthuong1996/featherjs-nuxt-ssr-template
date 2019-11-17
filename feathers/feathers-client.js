// src/feathers-client.js
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authClient from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import feathersVuex from 'feathers-vuex' // or '@/libs/feathers-vuex' if you're copying feathers-vuex as mentioned earlier.
import MemoryStorage from 'memorystorage'
import axios from 'axios'
const rest = require('@feathersjs/rest-client')

// Setup the Feathers client
const host = `${process.env.API_ENDPOINT}` // or set a string here, directly
// eslint-disable-next-line import/no-mutable-exports
let feathersClient = null
const storage = new MemoryStorage()
if (process.client) {
  const socket = io(host, { transports: ['websocket'] })
  feathersClient = feathers()
    .configure(socketio(socket))
    .configure(authClient({ storage }))
} else {
  const restClient = rest(host)
  feathersClient = feathers()
    .configure(restClient.axios(axios))
    .configure(authClient())
}

export default feathersClient

// Setup feathers-vuex
const {
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models,
  clients,
  FeathersVuex
} = feathersVuex(feathersClient, {
  serverAlias: 'api', // or whatever that makes sense for your project
  idField: '_id', // `id` and `_id` are both supported, so this is only necessary if you're using something else.,
  debug: true
})

export {
  makeAuthPlugin,
  makeServicePlugin,
  BaseModel,
  models,
  clients,
  FeathersVuex
}
