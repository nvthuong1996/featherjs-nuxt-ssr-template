<template>
  <div>
    <h1>Login</h1>
    <div>
      <input v-model="email" type="text" placeholder="email...." />
      <input v-model="password" type="password" placeholder="password...." />
    </div>
    <div>
      <button @click="login">Login</button>
      <nuxt-link to="/register">Register</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import feathersClient from '@/feathers/feathers-client'

export default {
  auth: 'guest',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('users', ['create']),
    async login() {
      try {
        const credentials = {
          email: this.email,
          password: this.password,
          strategy: 'local'
        }
        // await this.authenticate({ ...credentials, strategy: 'local' })
        await this.$auth.loginWith('local', {
          data: credentials
        })

        const token = this.$cookies.get('auth._token.local')
        if (token) {
          await feathersClient.authentication.setAccessToken(
            token.replace('Bearer ', '')
          )
          await feathersClient.reAuthenticate()
        }
      } catch (ex) {
        alert(String(ex))
      }
    }
  }
}
</script>

<style></style>
