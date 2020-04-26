import Vue from 'vue'
import Vuex from 'vuex'
import { axiosBase } from './api/axios-base'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
     accessToken: localStorage.getItem('access_token') || null, // makes sure the user is logged in even after
     APIData: '' // received data from the backend API is stored here.
  },
  getters: {
    loggedIn (state) {
      return state.accessToken != null
    }
  },
  mutations: {
    updateLocalStorage (state, { access }) {
      localStorage.setItem('access_token', access)
      state.accessToken = access
    },
    updateAccess (state, access) {
      state.accessToken = access
    },
    destroyToken (state) {
      state.accessToken = null
    }
  },
  actions: {
    logoutUser (context) {
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axiosBase.post('logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve()
            })
            .catch(err => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(err)
            })
        })
      }
    },
    loginUser (context, credentials) {
      return new Promise((resolve, reject) => {
        // send the username and password to the backend API:
        axiosBase.post('login', {
          email: credentials.email,
          password: credentials.password
        })
        // if successful update local storage:
          .then(response => {
            context.commit('updateLocalStorage', { access: response.data.response.access_token }) // store the access and refresh token in localstorage
            axiosBase.defaults.headers.common['Authorization'] = 'Bearer '+response.data.response.access_token
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})
