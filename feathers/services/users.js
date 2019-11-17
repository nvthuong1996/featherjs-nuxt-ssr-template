// Bring in the imports from the feathers-client.js file.
import feathersClient, {
  makeServicePlugin,
  BaseModel
} from '../feathers-client'

// Extend the base class
class User extends BaseModel {
  static modelName = 'User'
  static instanceDefaults() {
    return {
      email: '',
      password: ''
    }
  }
  set setData(data) {
    Object.assign(this, data)
  }
}
const servicePath = 'users'
const servicePlugin = makeServicePlugin({
  Model: User,
  service: feathersClient.service(servicePath),
  servicePath
})

export default servicePlugin
