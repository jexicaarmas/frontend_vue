<template>
  <div class="home">
    <NavBar></NavBar>
    <div class="bod">
      <table class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Referencia</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Status</th>
                <th>Accciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="mod in APIData" :key="mod.id">
                <td :key="mod.id">{{mod.id}}</td>
                <td>{{mod.reference}}</td>
                <td>{{mod.name}}</td>
                <td>{{mod.quantity}}</td>
                <td v-if="mod.enable ==1"> Activo </td>
                <td v-if="mod.enable ==0"> Inactivo </td>
                <td>
                  <button class="btn btn-primary" data-toggle="modal" data-target="#modalProduct">Actualizar</button>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
  </div>
</template>

<script>
  import NavBar from '../components/Navbar'
  import { axiosBase } from '../api/axios-base'
  import { mapState } from 'vuex'
  
  export default {
    name: 'Home',
    onIdle () { // dispatch logoutUser if no activity detected
      this.$store.dispatch('logoutUser')
        .then(response => {
          this.$router.push('/')
        })
    },
    components: {
      NavBar
    },
    computed: mapState(['APIData']), // get APIData from store.state.
    created () {
        axiosBase.get('products', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } }) // proof that your access token is still valid; if not the
          .then(response => {
            this.$store.state.APIData = response.data.response // store the response data in store
          })
          .catch(err => { 
            console.log(err)
          })
    }
  }
</script>

<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Quicksand) ;
  .home {
    margin: 0;
    padding: 0;
  }
  .bod {
    background-color: white;
    text-align: center;
    color: white;
    font-family: 'Quicksand', sans-serif;
    padding: 0;
    margin: 78px 0;
  }
  .bod h1 {
    background-color: #292b2d;
    padding: 40px 0 40px 0;
    font-size: 32px;
    margin: 0;
  }
  .bod h2 {
    margin: 0;
    padding: 10px 0 10px 0;
  }
  .bod h3 {
    margin: 20px;
  }

</style>
