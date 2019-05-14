import Vue from 'vue'
import '@babel/polyfill'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo)

// HTTP connexion to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
