
<template>
  <div class="login-form">
    <div class="lg">
      <h2 v-if="wrongCred">Wrong credentials entered!. Please enter your correct details.</h2>
      <form v-on:submit.prevent="loginUser">
        <label for="email">Email</label>
        <input type="text" name="email" id="email" v-model="email">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password">
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
  import NavBar from '../components/Navbar'
  export default {
    name: 'login',
    components: {
      NavBar
    },
    data () {
      return {
        email: '',
        password: '',
        wrongCred: false // activates appropriate message if set to true
      }
    },
    methods: {
      loginUser () { // call loginUSer action
        this.$store.dispatch('loginUser', {
          email: this.email,
          password: this.password
        })
            .then(() => {
              this.wrongCred = false
              this.$router.push({ name: 'home' })
            })
          .catch(err => {
            console.log(err)
            this.wrongCred = true // if the credentials were wrong set wrongCred to true
          })
        }
      }
  }
</script>

<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Quicksand) ;
  .login-form {
    margin: 0;
    padding: 0;
  }
  .lg {
    background-color: #606366;
    text-align: center;
    color: white;
    font-family: 'Quicksand', sans-serif;
    padding: 0;
    margin: 78px 0;
  }
</style>
