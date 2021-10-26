<template>
  <div id="nav">
    <router-link to="/">Home | </router-link>
    <router-link to="/about">About | </router-link>
    <router-link v-show="islogin" to="/sistema">Sistema | </router-link>
    <router-link v-show="!islogin" to="/login">Login | </router-link>
    <router-link v-show="islogin" to="/logout">Logout</router-link>
  </div>
  <router-view/>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'App',
  computed: {
    ...mapGetters(['islogin'])
  }
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
