import axios from 'axios'
import store from '../store'
const APIUrl = 'http://backend.test/api/'

const axiosBase = axios.create({
  baseURL: APIUrl,
  headers: { 
            contentType: 'application/json', 
            AppKey: '5kEDnKkipeSRRhcUkW8u7w2U5dFB3bwuUaRTHS7YNtAXFkgNe8qXfugpYvtxNUpgXiUjrqMgkSQcCpej'
            }
})

const getAPI = axios.create({
  baseURL: APIUrl
})


export { axiosBase, getAPI }
