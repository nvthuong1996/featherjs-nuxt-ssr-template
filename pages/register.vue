<template>
  <div>
    <h1>Register</h1>
    <div>
      <input v-model="email" type="text" placeholder="email...." />
      <input v-model="password" type="password" placeholder="password...." />
    </div>
    <div>
      <button @click="register">Register</button>
      <nuxt-link to="/login">login</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
    // eslint-disable-next-line require-await
    async register() {
      // const { User } = this.$FeathersVuex.api
      // const user = new User({
      //   email: '123',
      //   password: '456'
      // })
      // console.log(user)
      // user.email = 'a@abc.com'
      // user.password = '1234'

      // await this.create({
      //   email: 'test1@a.com',
      //   password: '123'
      // })

      const { User } = this.$FeathersVuex.api
      const user = new User({
        email: this.email,
        password: this.password
      })
      user.email = this.email
      user.password = this.password
      try {
        await user.create()
        this.$router.push('/login')
      } catch (ex) {
        alert(String(ex))
      }
    }
  }
}
</script>
