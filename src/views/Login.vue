<template>
  <!-- Default form login -->
  <form v-on:submit.prevent="loginUser"> 
    <p class="h4 text-center mb-4">Login</p>
    <label for="email" class="grey-text">Email</label>
    <input type="email" id="email" class="form-control" v-model="email" required/>
    <br/>
    <label for="password" class="grey-text">Contraseña</label>
    <input type="password" id="password" class="form-control" v-model="password" required/>
    <div class="text-center mt-4">
      <button class="btn btn-primary" type="submit">Ingresar</button>
    </div>
    <br>
    <div v-if="wrongCred" class="alert alert-danger" role="alert">
    Credenciales Incorrectas
    </div>
  </form>
  <!-- Default form login -->
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
  
</style>
